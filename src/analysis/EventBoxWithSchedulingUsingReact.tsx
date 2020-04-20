import React, { FunctionComponent, ReactElement, useEffect, useState } from 'react';

import { Observable, Subscription } from 'rxjs';
import { concatAll, filter } from 'rxjs/operators';

import { useEvents } from '../shared/events/EventsContext';
import { Event } from '../shared/events/EventsContext.interfaces';
import { useRenderScheduler } from '../shared/render-scheduler/RenderSchedulerContext';
import { RenderScheduler } from '../shared/render-scheduler/RenderScheduler';

/**
 * Event Box, with scheduling, using React
 */
const EventBoxWithSchedulingUsingReact: FunctionComponent<{ eventId: number }> = ({ eventId }): ReactElement => {
  // Color state
  const [color, setColor] = useState('#FFF');

  // Event stream
  const eventStream: Observable<Array<Event>> = useEvents();
  const renderScheduler: RenderScheduler = useRenderScheduler();
  useEffect(() => {
    // Get latest event
    const subscription: Subscription = eventStream
      .pipe(
        concatAll(),
        filter((event: Event): boolean => {
          return event.id === eventId;
        }),
      )
      .subscribe((event: Event): void => {
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

export default EventBoxWithSchedulingUsingReact;
