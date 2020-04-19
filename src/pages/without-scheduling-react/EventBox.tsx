import React, { FunctionComponent, ReactElement, useEffect, useState } from 'react';

import { Observable, Subscription } from 'rxjs';
import { concatAll, filter } from 'rxjs/operators';

import { useEventStream } from '../../shared/EventContext';

/**
 * Event Box
 */
const EventBox: FunctionComponent<{ id: number }> = ({ id }): ReactElement => {
  // Color state
  const [color, setColor] = useState('#FFF');

  // Event stream
  const eventStream: Observable<any> = useEventStream();
  useEffect(() => {
    // Get latest event
    const subscription: Subscription = eventStream
      .pipe(
        concatAll(),
        filter((event: any): boolean => {
          return event.id === id;
        }),
      )
      .subscribe((event: any) => {
        setColor(event.color);
      });

    // Cleanup
    return () => {
      subscription.unsubscribe();
    };
  }, [eventStream, id]);

  // Render
  return <div style={{ backgroundColor: color }}>Event {id}</div>;
};

export default EventBox;
