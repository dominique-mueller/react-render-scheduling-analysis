import React, { FunctionComponent, ReactElement } from 'react';

import { AreaChart, XAxis, YAxis, CartesianGrid, Tooltip, Area, ResponsiveContainer } from 'recharts';

import { ProfilerResult } from './Profiler.interfaces';

/**
 * Profiler line chart tooltip
 */
const ProfilerLineChartTooltip: FunctionComponent<{
  active: boolean;
  payload: Array<any>;
  label: string;
}> = ({ active, payload }): ReactElement | null => {
  return active ? (
    <div style={{ backgroundColor: '#FFF', padding: '6px 8px', border: '1px solid #AAA' }}>
      <ul style={{ marginTop: 0, marginBottom: 0, paddingLeft: 0, listStyleType: 'none' }}>
        <li style={{ marginBottom: '12px' }}>
          <div style={{ color: '#666', fontSize: '12px' }}>Time</div>
          <div style={{ color: '#333', fontSize: '16px' }}>
            {new Date(payload[0].payload.x).toISOString().replace('T', ' ').replace('Z', ' ')}
          </div>
        </li>
        <li>
          <div style={{ color: '#666', fontSize: '12px' }}>Render time</div>
          <div style={{ color: '#333', fontSize: '16px' }}>{payload[0].payload.y}&thinsp;ms</div>
        </li>
      </ul>
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
  const data: Array<any> = profilerResults.map((profilerResult: ProfilerResult): any => {
    return {
      x: profilerResult.timestamp.getTime(),
      y: Math.round(profilerResult.actualDuration * 100) / 100,
    };
  });

  // Define chart domain
  const yDomain: [number, number] = [
    0,
    Math.ceil(
      Math.max(
        ...data.map((item: any): number => {
          return item.y;
        }),
      ),
    ),
  ];

  // Render
  return (
    <ResponsiveContainer>
      <AreaChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
        <XAxis dataKey="x" tick={false} />
        <YAxis dataKey="y" domain={yDomain} unit="ms" />
        <CartesianGrid strokeDasharray="2 3" />
        <Tooltip content={ProfilerLineChartTooltip} />
        <Area type="linear" dataKey="y" stroke="#3182CE" fill="#3182CE" animationDuration={500} />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default ProfilerLineChart;
