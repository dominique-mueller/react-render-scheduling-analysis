import React, { FunctionComponent, ReactElement, useEffect, useRef } from 'react';

import { Observable, Subscription } from 'rxjs';
import { concatAll, filter } from 'rxjs/operators';

import { useEventStream } from '../../shared/EventContext';

/**
 * Event Box
 */
const EventBox: FunctionComponent<{ id: number }> = ({ id }): ReactElement => {
  // DOM ref
  const boxRef = useRef<HTMLDivElement>(null);

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
        if (boxRef.current) {
          boxRef.current.style.backgroundColor = event.color;
        }
      });

    // Cleanup
    return () => {
      subscription.unsubscribe();
    };
  }, [eventStream, id]);

  // Render
  return <div ref={boxRef}>Event {id}</div>;
};

export default EventBox;
