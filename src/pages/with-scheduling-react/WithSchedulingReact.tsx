import React, { FunctionComponent, ReactElement, useRef, Profiler } from 'react';

import EventBox from './EventBox';
import { AppConfig } from '../../AppConfig';

/**
 * With scheduling, using React
 */
const WithSchedulingReact: FunctionComponent = (): ReactElement => {
  const actualDurations = useRef<Array<any>>([]);

  const onRenderCallback = (
    id: any,
    phase: any,
    actualDuration: any,
    baseDuration: any,
    startTime: any,
    commitTime: any,
    interactions: any,
  ) => {
    if (actualDurations.current.length === AppConfig.profilerExecutions) {
      const overallActualDuration: number = actualDurations.current.reduce((a: number, b: number): number => {
        return a + b;
      }, 0);
      const averageActualDuration: number = overallActualDuration / AppConfig.profilerExecutions;
      console.log('Average actual duration:', averageActualDuration);
    }
    if (phase === 'update') {
      // console.log(actualDurations.current.length, actualDuration);
      actualDurations.current.push(actualDuration);
    }
  };

  return (
    <>
      <h2>With scheduling, using React</h2>
      <Profiler id="with-scheduling-react" onRender={onRenderCallback}>
        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
          {[...Array(AppConfig.numberOfEvents)].map((value, index) => {
            return (
              <div key={index}>
                <EventBox id={index} />
              </div>
            );
          })}
        </div>
      </Profiler>
    </>
  );
};

export default WithSchedulingReact;
