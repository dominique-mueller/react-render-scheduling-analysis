import React, { FunctionComponent, ReactElement } from 'react';

import { AreaChart, XAxis, YAxis, CartesianGrid, Tooltip, Area, ResponsiveContainer } from 'recharts';

import { ProfilerResult } from './Profiler.interfaces';
import { getCompleteRenderDuration } from './utilities/getCompleteRenderDuration';

/**
 * Profiler line chart tooltip
 */
const ProfilerLineChartTooltip: FunctionComponent<{
  active: boolean;
  payload: Array<any>;
  label: string;
}> = ({ active, payload }): ReactElement | null => {
  return active ? (
    <div style={{ backgroundColor: '#FFF', padding: '6px 8px', border: '1px solid #AAA', color: '#666', fontSize: '12px' }}>
      Render time: {payload[0].payload.y}ms
    </div>
  ) : null;
};

/**
 * Profiler line chart
 */
const ProfilerLineChart: FunctionComponent<{
  profilerResults: Array<ProfilerResult>;
}> = ({ profilerResults }): ReactElement => {
  // Transform data into chart-compatible format
  const data: Array<any> = profilerResults.reduce(
    (acc: Array<any>, profilerResult: ProfilerResult, index: number): any => {
      acc.push({
        run: profilerResult.run,
        x: acc[index].x + profilerResult.actualDuration,
        y: profilerResult.actualDuration,
      });
      return acc;
    },
    // Start with x=0 so that the chart starts at the beginning
    [
      {
        run: profilerResults[0].run,
        x: 0,
        y: profilerResults[0].actualDuration,
      },
    ],
  );

  // Define ticks
  const ticks: Array<number> = data
    .reduce((acc: Array<any>, item: any) => {
      if (acc[item.run] === undefined) {
        acc[item.run] = [];
      }
      acc[item.run].push(item);
      return acc;
    }, [])
    .map((dataByRun: Array<any>): number => {
      return dataByRun[dataByRun.length - 1].x;
    });

  // Define tick formatter
  const tickFormatter = (): string => {
    return '';
  };

  // Define chart domain
  const xDomain: [number, number] = [0, getCompleteRenderDuration(profilerResults)];

  // Render
  return (
    <ResponsiveContainer>
      <AreaChart data={data} margin={{ top: 16, bottom: 16 }}>
        <XAxis
          dataKey="x"
          domain={xDomain}
          type="number"
          ticks={ticks}
          tickFormatter={tickFormatter}
          tick={{ fontSize: '0' }}
          tickSize={0}
        />
        <YAxis dataKey="y" type="number" unit="ms" width={64} tick={{ fontSize: '12px' }} tickSize={12} />
        <CartesianGrid strokeDasharray="2 3" />
        <Tooltip content={ProfilerLineChartTooltip} />
        <Area type="stepBefore" dataKey="y" stroke="#3182CE" fill="#3182CE" animationDuration={500} />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default ProfilerLineChart;
