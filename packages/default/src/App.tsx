import React, { ReactElement, FunctionComponent, Profiler, useRef, useEffect } from 'react';

import { Observable, Subscription } from 'rxjs';

import { createEventStream } from './event-stream';
import EventBox from './EventBox';

// Collect data and end data collection based on event stream
const eventStream: Observable<Array<Event>> = createEventStream({
  emitInterval: 1000,
  numberOfExecutions: 5,
  numberOfGeneratedEvents: 100,
});

/**
 * App
 */
const App: FunctionComponent = (): ReactElement => {
  // State
  const profilerResults = useRef<Array<any>>([]);
  const profilerResultsExectionCounter = useRef<number>(0);

  useEffect(() => {
    // Setup event subscription
    const subscription: Subscription = eventStream.subscribe({
      next: (): void => {
        // WORKAROUND: Because scheduling happens at different times, we need to count renders after we are sure the rendering happened
        setTimeout(() => {
          profilerResultsExectionCounter.current++;
        }, 500);
      },
      complete: (): void => {
        setTimeout(() => {
          console.info(JSON.stringify(profilerResults.current, null, '  '));
        }, 1000);
      },
    });

    // Cleanup
    return (): void => {
      subscription.unsubscribe();
    };
  }, []);

  // Handle render callback
  const handleOnRender = (
    id: string,
    phase: 'mount' | 'update',
    actualDuration: number,
    baseDuration: number,
    startTime: number,
    commitTime: number,
  ) => {
    // Ignore render phases other than "update"
    if (phase !== 'update') {
      return;
    }

    // Save profiling results
    profilerResults.current.push({
      timestamp: new Date(),
      execution: profilerResultsExectionCounter.current,
      actualDuration: Math.round(actualDuration * 100) / 100,
      baseDuration: Math.round(baseDuration * 100) / 100,
      startTime: Math.round(startTime * 100) / 100,
      commitTime: Math.round(commitTime * 100) / 100,
    });
  };

  return (
    <Profiler id="profiler" onRender={handleOnRender}>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {[...Array(100)].map(
          (value: undefined, index: number): ReactElement => {
            return <EventBox key={index} eventStream={eventStream} eventId={index} />;
          },
        )}
      </div>
    </Profiler>
  );
};

export default App;
