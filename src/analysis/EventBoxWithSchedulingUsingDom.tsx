import React, { FunctionComponent, ReactElement, useEffect, useRef } from 'react';

import { Observable, Subscription } from 'rxjs';
import { concatAll, filter } from 'rxjs/operators';

import { useEvents } from '../shared/events/EventsContext';
import { useRenderScheduler } from '../shared/render-scheduler/RenderSchedulerContext';
import { RenderScheduler } from '../shared/render-scheduler/RenderScheduler';

/**
 * Event Box, with scheduling, using DOM
 */
const EventBoxWithSchedulingUsingDom: FunctionComponent<{ eventId: number }> = ({ eventId: id }): ReactElement => {
  // DOM ref
  const boxRef = useRef<HTMLDivElement>(null);

  // Render scheduler
  const renderScheduler: RenderScheduler = useRenderScheduler();

  // Event stream
  const eventStream: Observable<any> = useEvents();
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
          if (boxRef.current) {
            boxRef.current.style.backgroundColor = event.color;
          }
        });
      });

    // Cleanup
    return () => {
      subscription.unsubscribe();
    };
  }, [renderScheduler, eventStream, id]);

  // Render
  return <div ref={boxRef}>Event {id}</div>;
};

export default EventBoxWithSchedulingUsingDom;
