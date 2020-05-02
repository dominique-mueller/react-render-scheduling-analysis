import React, { FunctionComponent, ReactElement, useEffect, useState } from 'react';

import { Observable, Subscription } from 'rxjs';
import { concatAll, filter } from 'rxjs/operators';
import { RenderScheduler } from './RenderScheduler';

/**
 * Event Box
 */
const EventBox: FunctionComponent<{ eventStream: Observable<Array<any>>; eventId: number; renderScheduler: RenderScheduler }> = ({
  eventStream,
  eventId,
  renderScheduler,
}): ReactElement => {
  // Color state
  const [color, setColor] = useState('#FFF');

  // Event stream
  useEffect(() => {
    // Get latest event
    const subscription: Subscription = eventStream
      .pipe(
        concatAll(),
        filter((event: any): boolean => {
          return event.id === eventId;
        }),
      )
      .subscribe((event: any): void => {
        renderScheduler.scheduleTask(() => {
          setColor(event.color);
        });
      });

    // Cleanup
    return (): void => {
      subscription.unsubscribe();
    };
  }, [renderScheduler, eventStream, eventId]);

  // Render
  return <div style={{ backgroundColor: color }}>Event {eventId}</div>;
};

export default EventBox;
