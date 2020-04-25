import React, { FunctionComponent, ReactElement, Profiler, useRef, useEffect } from 'react';

import { Observable, Subscription } from 'rxjs';

import { AppConfig } from '../AppConfig';
import { useEvents } from '../shared/events/EventsContext';
import { ProfilerResult } from '../profiler/Profiler.interfaces';
import { Event } from '../shared/events/EventsContext.interfaces';

/**
 * Analysis Page
 */
const AnalysisPage: FunctionComponent<{
  id: string;
  title: string;
  render: (eventId: number) => ReactElement;
  complete: (profilerResults: Array<ProfilerResult>) => unknown;
}> = ({ id, title, render, complete }): ReactElement => {
  // State
  const profilerResults = useRef<Array<ProfilerResult>>([]);

  const run = useRef<number>(0);
  const eventStream: Observable<Array<Event>> = useEvents();
  useEffect(() => {
    const subscription: Subscription = eventStream.subscribe({
      next: (): void => {
        run.current++;
      },
      complete: (): void => {
        complete(Object.assign([], profilerResults.current));
      },
    });

    // Cleanup
    return () => {
      subscription.unsubscribe();
    };
  }, [complete, eventStream]);

  // Handle render callback
  const onRenderCallback = (
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
      run: run.current,
      id,
      phase,
      actualDuration,
      baseDuration,
      startTime,
      commitTime,
    });
  };

  // Render
  return (
    <>
      <h2>{title}</h2>
      <Profiler id={id} onRender={onRenderCallback}>
        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
          {[...Array(AppConfig.numberOfEvents)].map(
            (value: undefined, index: number): ReactElement => {
              return <div key={index}>{render(index)}</div>;
            },
          )}
        </div>
      </Profiler>
    </>
  );
};

export default AnalysisPage;
