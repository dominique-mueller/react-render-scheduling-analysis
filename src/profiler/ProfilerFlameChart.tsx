import React, { FunctionComponent, ReactElement } from 'react';

import { FlameGraph } from 'react-flame-graph';

import { ProfilerResult } from './Profiler.interfaces';

/**
 * Profiler Flame Chart
 */
const ProfilerFlameChart: FunctionComponent<{ profilerResults: Array<ProfilerResult> }> = ({ profilerResults }): ReactElement => {
  // Transform data into chart-compatible format
  const data: Array<any> = profilerResults.map((profilerResult: ProfilerResult): any => {
    return {
      name: '',
      value: Math.round(profilerResult.actualDuration * 100) / 100,
    };
  });

  // Calculate complete time
  const completeTime: number = data.reduce((accumulatedTime: number, item: any): number => {
    return accumulatedTime + item.value;
  }, 0);

  // Render
  return <FlameGraph data={{ name: '', value: completeTime, children: data }} height={300} width={1500} />;
};

export default ProfilerFlameChart;
