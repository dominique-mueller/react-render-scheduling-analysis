import React, { FunctionComponent, ReactElement } from 'react';

import { FlameGraph } from 'react-flame-graph';

import { ProfilerResult } from './Profiler.interfaces';

/**
 * Profiler Flame Chart
 */
const ProfilerFlameChart: FunctionComponent<{ profilerResults: Array<ProfilerResult> }> = ({ profilerResults }): ReactElement => {
  const data: Array<Array<any>> = profilerResults
    .reduce((profilerResultsByRun: Array<Array<ProfilerResult>>, profilerResult: ProfilerResult) => {
      if (profilerResultsByRun[profilerResult.run] === undefined) {
        profilerResultsByRun[profilerResult.run] = [];
      }
      profilerResultsByRun[profilerResult.run].push(profilerResult);
      return profilerResultsByRun;
    }, [])
    .map((profilerResultsByRun: Array<ProfilerResult>): any => {
      const value: number = profilerResultsByRun.reduce((accumulatedTime: number, profilerResult: ProfilerResult) => {
        return accumulatedTime + profilerResult.actualDuration;
      }, 0);
      return {
        backgroundColor: '#3182CE',
        color: '#FFF',
        name: `Run ${profilerResultsByRun[0].run + 1} (${Math.round(value * 100) / 100}ms)`,
        value: value,
        children: profilerResultsByRun.map((profilerResult: ProfilerResult, index: number): any => {
          return {
            backgroundColor: '#3182CE',
            color: '#FFF',
            name: `Render ${index + 1} (${Math.round(profilerResult.actualDuration * 100) / 100}ms)`,
            value: profilerResult.actualDuration,
          };
        }),
      };
    });

  // Calculate complete time
  const completeTime: number = data.reduce((accumulatedTime: number, item: any): number => {
    return accumulatedTime + item.value;
  }, 0);

  // Render
  return (
    <div style={{ paddingLeft: '64px' }}>
      <FlameGraph
        data={{
          name: `All runs (${Math.round(completeTime * 100) / 100}ms)`,
          backgroundColor: '#3182CE',
          color: '#FFF',
          value: completeTime,
          children: data,
        }}
        disableDefaultTooltips={true}
        height={64}
        width={1500 - 64}
      />
    </div>
  );
};

export default ProfilerFlameChart;
