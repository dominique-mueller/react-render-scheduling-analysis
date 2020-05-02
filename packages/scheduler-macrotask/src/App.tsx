import React, { ReactElement, FunctionComponent, Profiler, useRef, useEffect } from 'react';

import { Observable, Subscription } from 'rxjs';

import { createEventStream } from './event-stream';
import EventBox from './EventBox';
import { RenderScheduler } from './RenderScheduler';

// Define config
const config = {
  emitInterval: 1000,
  numberOfExecutions: parseInt(new URLSearchParams(window.location.search).get('numberOfExecutions') || '5', 10),
  numberOfGeneratedEvents: parseInt(new URLSearchParams(window.location.search).get('numberOfGeneratedEvents') || '100', 10),
};

// Collect data and end data collection based on event stream
const eventStream: Observable<Array<Event>> = createEventStream(config);

// Create render scheduler
const renderScheduler: RenderScheduler = new RenderScheduler();

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
        }, config.emitInterval - 100);
      },
      complete: (): void => {
        setTimeout(() => {
          console.info(JSON.stringify(profilerResults.current, null, '  '));
        }, config.emitInterval);
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
        {[...Array(config.numberOfGeneratedEvents)].map(
          (value: undefined, index: number): ReactElement => {
            return <EventBox key={index} eventStream={eventStream} eventId={index} renderScheduler={renderScheduler} />;
          },
        )}
      </div>
    </Profiler>
  );
};

export default App;
