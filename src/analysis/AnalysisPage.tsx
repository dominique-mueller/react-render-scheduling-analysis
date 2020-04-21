import React, { FunctionComponent, ReactElement, Profiler, useRef, useEffect } from 'react';

import { Observable, Subscription } from 'rxjs';

import { AppConfig } from '../AppConfig';
import { useEvents } from '../shared/events/EventsContext';

/**
 * Analysis Page
 */
const AnalysisPage: FunctionComponent<{
  id: string;
  title: string;
  render: (eventId: number) => ReactElement;
  complete: (profilerResults: Array<any>) => unknown;
}> = ({ id, title, render, complete }): ReactElement => {
  // State
  const profilerResults = useRef<Array<any>>([]);

  const eventStream: Observable<any> = useEvents();
  useEffect(() => {
    // Get latest event
    const subscription: Subscription = eventStream.subscribe({
      next: (): void => {
        // console.log('Processing events ...');
      },
      complete: (): void => {
        complete(Object.assign([], profilerResults.current));
        // console.log('Completed.');
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
    interactions: Set<{
      id: number;
      name: string;
      timestamp: number;
    }>,
  ) => {
    if (phase !== 'update') {
      return;
    }

    profilerResults.current.push({
      timestamp: new Date(),
      id,
      phase,
      actualDuration,
      baseDuration,
      startTime,
      commitTime,
      interactions,
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
