import React, { FunctionComponent, ReactElement, useEffect, useState } from 'react';

import { Observable, Subscription } from 'rxjs';
import { concatAll, filter } from 'rxjs/operators';

import { useEventStream } from '../../shared/EventContext';
import { useRenderScheduler } from '../../shared/RenderSchedulerContext';
import { RenderScheduler } from '../../shared/RenderScheduler';

/**
 * Event Box
 */
const EventBox: FunctionComponent<{ id: number }> = ({ id }): ReactElement => {
  // Render scheduler
  const renderScheduler: RenderScheduler = useRenderScheduler();

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
        renderScheduler.scheduleTask(() => {
          setColor(event.color);
        });
      });

    // Cleanup
    return () => {
      subscription.unsubscribe();
    };
  }, [renderScheduler, eventStream, id]);

  // Render
  return <div style={{ backgroundColor: color }}>Event {id}</div>;
};

export default EventBox;
