import React, { FunctionComponent } from 'react';

import { BarChart, CartesianGrid, XAxis, YAxis, Bar } from 'recharts';

import { ProfilerResult } from '../Profiler.interfaces';
import { getMinRenderDuration } from '../utilities/getMinRenderDuration';
import { getAverageRenderDuration } from '../utilities/getAverageRenderDuration';
import { getMaxRenderDuration } from '../utilities/getMaxRenderDuration';

/**
 * Profiler render duration bar chart
 */
const ProfilerRenderDurationBarChart: FunctionComponent<{
  profilerResults: Array<ProfilerResult>;
  width: number;
  height: number;
}> = ({ profilerResults, width, height }) => {
  // Get chart data
  const chartData: Array<any> = [
    {
      name: 'Minimum',
      value: getMinRenderDuration(profilerResults),
    },
    {
      name: 'Average',
      value: getAverageRenderDuration(profilerResults),
    },
    {
      name: 'Maximum',
      value: getMaxRenderDuration(profilerResults),
    },
  ];
  console.log(chartData);

  // Render
  return (
    <BarChart
      width={width}
      height={height}
      data={chartData}
      layout="vertical"
      margin={{
        top: 10,
        right: 50,
        left: 20,
        bottom: 5,
      }}
    >
      <CartesianGrid strokeDasharray="2 3" horizontal={false} />
      <XAxis type="number" dataKey="value" unit="ms" tick={{ fontSize: '12px', fill: '#285E61' }} tickSize={12} />
      <YAxis type="category" dataKey="name" interval={0} tickSize={12} tick={{ fontSize: '12px', fill: '#285E61' }} width={80} />
      <Bar
        dataKey="value"
        fill="#38A169"
        unit="ms"
        label={{
          position: 'right',
          fontSize: '10px',
          fill: '#38A169',
          fontWeight: 600,
          formatter: (label: number | string): string => {
            return `${label}ms`;
          },
        }}
      />
    </BarChart>
  );
};

export default ProfilerRenderDurationBarChart;
