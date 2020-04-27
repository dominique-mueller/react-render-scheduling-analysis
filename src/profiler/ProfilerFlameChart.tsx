import React, { FunctionComponent, ReactElement } from 'react';

import { FlameGraph } from 'react-flame-graph';

import { ProfilerResult } from './Profiler.interfaces';
import { getCompleteRenderDuration } from './utilities/getCompleteRenderDuration';
import { groupUpdatesByRender } from './utilities/groupUpdatesByRender';

/**
 * Profiler Flame Chart
 */
const ProfilerFlameChart: FunctionComponent<{ profilerResults: Array<ProfilerResult> }> = ({ profilerResults }): ReactElement => {
  // Chart data
  const chartData: Array<Array<any>> = groupUpdatesByRender(profilerResults).map((profilerResultsForRender: Array<ProfilerResult>): any => {
    const value: number = getCompleteRenderDuration(profilerResultsForRender);
    return {
      backgroundColor: '#3182CE',
      color: '#FFF',
      name: `Run ${profilerResultsForRender[0].run + 1} (${value}ms)`,
      value: value,
      children: profilerResultsForRender.map((profilerResult: ProfilerResult, index: number): any => {
        return {
          backgroundColor: '#3182CE',
          color: '#FFF',
          name: `Render ${index + 1} (${profilerResult.actualDuration}ms)`,
          value: profilerResult.actualDuration,
        };
      }),
    };
  });

  // Calculate complete time
  const completeTime: number = getCompleteRenderDuration(profilerResults);

  // Render
  return (
    <div style={{ paddingLeft: '64px' }}>
      <FlameGraph
        data={{
          name: `All runs (${completeTime}ms)`,
          backgroundColor: '#3182CE',
          color: '#FFF',
          value: completeTime,
          children: chartData,
        }}
        disableDefaultTooltips={true}
        height={64}
        width={1500 - 64}
      />
    </div>
  );
};

export default ProfilerFlameChart;
