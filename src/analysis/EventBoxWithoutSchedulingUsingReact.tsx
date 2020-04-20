import React, { FunctionComponent, ReactElement, useEffect, useState } from 'react';

import { Observable, Subscription } from 'rxjs';
import { concatAll, filter } from 'rxjs/operators';

import { useEvents } from '../shared/events/EventsContext';
import { Event } from '../shared/events/EventsContext.interfaces';

/**
 * Event Box, without scheduling, using React
 */
const EventBoxWithoutSchedulingUsingReact: FunctionComponent<{ eventId: number }> = ({ eventId }): ReactElement => {
  // Color state
  const [color, setColor] = useState('#FFF');

  // Event stream
  const eventStream: Observable<Array<Event>> = useEvents();
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
        setColor(event.color);
      });

    // Cleanup
    return (): void => {
      subscription.unsubscribe();
    };
  }, [eventStream, eventId]);

  // Render
  return <div style={{ backgroundColor: color }}>Event {eventId}</div>;
};

export default EventBoxWithoutSchedulingUsingReact;
