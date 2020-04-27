import React, { FunctionComponent, ReactElement, Profiler, useRef, useEffect, useState } from 'react';

import { Observable, Subscription } from 'rxjs';

import { AppConfig } from '../AppConfig';
import { useEvents } from '../shared/events/EventsContext';
import { ProfilerResult } from '../profiler/Profiler.interfaces';
import { Event } from '../shared/events/EventsContext.interfaces';
import ProfilerLineChart from '../profiler/ProfilerLineChart';
import ProfilerFlameChart from '../profiler/ProfilerFlameChart';
import ProfilerStatistics from '../profiler/ProfilerStatistics';

/**
 * Analysis Page
 */
const AnalysisPage: FunctionComponent<{
  id: string;
  title: string;
  render: (eventId: number) => ReactElement;
}> = ({ id, title, render }): ReactElement => {
  // State
  const [isAnalysisRunning, setIsAnalysisRunning] = useState(false);
  const [profilerResults, setProfilerResults] = useState<Array<ProfilerResult>>([]);
  const profilerResultsCache = useRef<Array<ProfilerResult>>([]);
  const profilerResultsRender = useRef<number>(0);

  // Collect data and end data collection based on event stream
  const eventStream: Observable<Array<Event>> = useEvents();
  useEffect(() => {
    if (!isAnalysisRunning) {
      return;
    }

    const subscription: Subscription = eventStream.subscribe({
      next: (): void => {
        // WORKAROUND: Because scheduling happens at different times, we need to count renders after we are sure the rendering happened
        setTimeout(() => {
          profilerResultsRender.current++;
        }, 500);
      },
      complete: (): void => {
        setTimeout(() => {
          setProfilerResults([...profilerResultsCache.current]);
          setIsAnalysisRunning(false);
        }, 1000);
      },
    });

    // Cleanup
    return () => {
      subscription.unsubscribe();
    };
  }, [eventStream, isAnalysisRunning]);

  // Prevent any interaction while analysis is running
  useEffect(() => {
    window.document.body.style.pointerEvents = isAnalysisRunning ? 'none' : null;
  }, [isAnalysisRunning]);

  // Handle run button click
  const handleOnRunButtonClick = (): void => {
    // Reset profiler results
    profilerResultsCache.current = [];
    profilerResultsRender.current = 0;

    // Start analysis
    setIsAnalysisRunning(true);
  };

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
    profilerResultsCache.current.push({
      timestamp: new Date(),
      run: profilerResultsRender.current,
      id,
      phase,
      actualDuration: Math.round(actualDuration * 100) / 100,
      baseDuration: Math.round(baseDuration * 100) / 100,
      startTime: Math.round(startTime * 100) / 100,
      commitTime: Math.round(commitTime * 100) / 100,
    });
  };

  // Render
  return (
    <>
      <h2>{title}</h2>
      <button
        type="button"
        onClick={handleOnRunButtonClick}
        disabled={isAnalysisRunning}
        style={{ backgroundColor: '#333', border: 'none', color: '#FFF', padding: '9px 16px 8px', cursor: 'pointer' }}
      >
        {isAnalysisRunning ? 'Running ...' : 'Run!'}
      </button>
      {isAnalysisRunning && (
        <Profiler id={id} onRender={handleOnRender}>
          <div style={{ display: 'flex', flexWrap: 'wrap' }}>
            {[...Array(AppConfig.numberOfEvents)].map(
              (value: undefined, index: number): ReactElement => {
                return <div key={index}>{render(index)}</div>;
              },
            )}
          </div>
        </Profiler>
      )}
      {!isAnalysisRunning && profilerResults.length > 0 && (
        <>
          <div style={{ width: 1500, height: 200 }}>
            <ProfilerLineChart profilerResults={profilerResults} />
          </div>
          <ProfilerFlameChart profilerResults={profilerResults} />
          <ProfilerStatistics profilerResults={profilerResults} />
        </>
      )}
    </>
  );
};

export default AnalysisPage;
