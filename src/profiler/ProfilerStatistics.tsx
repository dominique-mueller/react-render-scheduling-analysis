import React, { FunctionComponent } from 'react';
import { ProfilerResult } from './Profiler.interfaces';
import { BarChart, CartesianGrid, XAxis, YAxis, Bar } from 'recharts';
import { getMinUpdateDuration } from './utilities/getMinUpdateDuration';
import { getMaxUpdateDuration } from './utilities/getMaxUpdateDuration';
import { getAverageUpdateDuration } from './utilities/getAverageUpdateDuration';
import { getMinRenderDuration } from './utilities/getMinRenderDuration';
import { getMaxRenderDuration } from './utilities/getMaxRenderDuration';
import { getAverageRenderDuration } from './utilities/getAverageRenderDuration';

/**
 * Profiler statistics
 */
const ProfilerStatistics: FunctionComponent<{
  profilerResults: Array<ProfilerResult>;
}> = ({ profilerResults }) => {
  // Get statistics
  const minUpdateDuration: number = getMinUpdateDuration(profilerResults);
  const maxUpdateDuration: number = getMaxUpdateDuration(profilerResults);
  const averageUpdateDuration: number = getAverageUpdateDuration(profilerResults);
  const minRenderDuration: number = getMinRenderDuration(profilerResults);
  const maxRenderDuration: number = getMaxRenderDuration(profilerResults);
  const averageRenderDuration: number = getAverageRenderDuration(profilerResults);

  // Get chart data
  const updateDurationsChartData: Array<any> = [
    {
      name: 'Minimum update duration',
      value: minUpdateDuration,
    },
    {
      name: 'Average update duration',
      value: averageUpdateDuration,
    },
    {
      name: 'Maximum update duration',
      value: maxUpdateDuration,
    },
  ];
  const renderDurationsChartData: Array<any> = [
    {
      name: 'Minimum render duration',
      value: minRenderDuration,
    },
    {
      name: 'Average render duration',
      value: averageRenderDuration,
    },
    {
      name: 'Maximum render duration',
      value: maxRenderDuration,
    },
  ];
  console.log(renderDurationsChartData);

  // Render
  // TODO: Extract bar chats into separate component
  return (
    <>
      <h2>Statistics</h2>

      <p>Number of renderings: {profilerResults.length}</p>
      <p>
        <em>TODO: Compare with 60fps frame budget</em>
      </p>

      <p>Update durations</p>

      <BarChart
        width={600}
        height={150}
        data={updateDurationsChartData}
        layout="vertical"
        margin={{
          top: 20,
          right: 50,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="2 3" horizontal={false} />
        <XAxis type="number" dataKey="value" unit="ms" tick={{ fontSize: '12px', fill: '#666' }} tickSize={12} />
        <YAxis type="category" dataKey="name" interval={0} tickSize={12} tick={{ fontSize: '12px', fill: '#666' }} width={200} />
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
              return `${Math.round((label as number) * 100) / 100}ms`;
            },
          }}
        />
      </BarChart>

      <p>Render durations</p>

      <BarChart
        width={600}
        height={150}
        data={renderDurationsChartData}
        layout="vertical"
        margin={{
          top: 20,
          right: 50,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="2 3" horizontal={false} />
        <XAxis type="number" dataKey="value" unit="ms" tick={{ fontSize: '12px', fill: '#666' }} tickSize={12} />
        <YAxis type="category" dataKey="name" interval={0} tickSize={12} tick={{ fontSize: '12px', fill: '#666' }} width={200} />
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
              return `${Math.round((label as number) * 100) / 100}ms`;
            },
          }}
        />
      </BarChart>
    </>
  );
};

export default ProfilerStatistics;
