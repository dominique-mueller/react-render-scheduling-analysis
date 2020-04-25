import React, { FunctionComponent, ReactNode } from 'react';
import { ProfilerResult } from './Profiler.interfaces';
import { BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Bar, LabelList } from 'recharts';

/**
 * Profiler statistics
 */
const ProfilerStatistics: FunctionComponent<{
  profilerResults: Array<ProfilerResult>;
}> = ({ profilerResults }) => {
  // Calculate minimum duration
  const minDuration: number =
    Math.round(
      Math.min(
        ...profilerResults.map((profilerResult: ProfilerResult): number => {
          return profilerResult.actualDuration;
        }),
      ) * 100,
    ) / 100;

  // Calculate maximum duration
  const maxDuration: number =
    Math.round(
      Math.max(
        ...profilerResults.map((profilerResult: ProfilerResult): number => {
          return profilerResult.actualDuration;
        }),
      ) * 100,
    ) / 100;

  // Calculate average duration
  const averageDuration: number =
    Math.round(
      (profilerResults.reduce((accumulatedDuration: number, profilerResult: ProfilerResult): number => {
        return accumulatedDuration + profilerResult.actualDuration;
      }, 0) /
        profilerResults.length) *
        100,
    ) / 100;

  const xDomain: [number, number] = [0, maxDuration];

  const data = [
    {
      name: 'Minimum duration',
      value: minDuration,
    },
    {
      name: 'Average duration',
      value: averageDuration,
    },
    {
      name: 'Maximum duration',
      value: maxDuration,
    },
  ];

  // Render
  return (
    <>
      <h2>Statistics</h2>

      <BarChart
        width={600}
        height={150}
        data={data}
        layout="vertical"
        margin={{
          top: 20,
          right: 50,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="2 3" />
        <XAxis type="number" dataKey="value" domain={xDomain} unit="ms" tick={{ fontSize: '12px', fill: '#666' }} tickSize={12} />
        <YAxis type="category" dataKey="name" tickSize={12} tick={{ fontSize: '12px', fill: '#666' }} width={150} />
        <Bar
          dataKey="value"
          fill="#3182CE"
          unit="ms"
          label={{
            position: 'right',
            fontSize: '10px',
            fill: '#3182CE',
            fontWeight: 500,
            formatter: (label: number | string): string => {
              return `${label}ms`;
            },
          }}
        />
      </BarChart>

      <p>Number of renderings: {profilerResults.length}</p>
      <p>Average render duration: {averageDuration}ms</p>
      <p>Min render duration: {minDuration}ms</p>
      <p>Max render duration: {maxDuration}ms</p>
      <p>Average run duration: TODO</p>
      <p>Min run duration: TODO</p>
      <p>Max run duration: TODO</p>
      <p>TODO: Compare with 60fps frame budget</p>
    </>
  );
};

export default ProfilerStatistics;
