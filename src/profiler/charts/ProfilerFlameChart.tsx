import React, { FunctionComponent, ReactElement } from 'react';

import { FlameGraph } from 'react-flame-graph';

import { ProfilerResult } from '../Profiler.interfaces';
import { getCompleteRenderDuration } from '../utilities/getCompleteRenderDuration';
import { groupUpdatesByRender } from '../utilities/groupUpdatesByRender';

/**
 * Profiler Flame Chart
 */
const ProfilerFlameChart: FunctionComponent<{ profilerResults: Array<ProfilerResult>; width: number; height: number }> = ({
  profilerResults,
  width,
  height,
}): ReactElement => {
  // Chart data
  const chartData: Array<Array<any>> = groupUpdatesByRender(profilerResults).map((profilerResultsForRender: Array<ProfilerResult>): any => {
    const value: number = getCompleteRenderDuration(profilerResultsForRender);
    return {
      backgroundColor: '#D69E2E',
      color: '#FFF',
      name: `Execution ${profilerResultsForRender[0].execution + 1} (${value}ms)`,
      value: value,
      children: profilerResultsForRender.map((profilerResult: ProfilerResult, index: number): any => {
        return {
          backgroundColor: '#D69E2E',
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
          name: `Root (${completeTime}ms)`,
          backgroundColor: '#D69E2E',
          color: '#FFF',
          value: completeTime,
          children: chartData,
        }}
        disableDefaultTooltips={true}
        height={height}
        width={width - 64}
      />
    </div>
  );
};

export default ProfilerFlameChart;
