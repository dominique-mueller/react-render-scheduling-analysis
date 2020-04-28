import React, { FunctionComponent } from 'react';

import { ProfilerResult } from './Profiler.interfaces';
import ProfilerLineChart from './charts/ProfilerLineChart';
import ProfilerFlameChart from './charts/ProfilerFlameChart';
import ProfilerUpdateDurationBarChart from './charts/ProfilerUpdateDurationBarChart';
import ProfilerRenderDurationBarChart from './charts/ProfilerRenderDurationBarChart';
import { getAverageRenderDuration } from './utilities/getAverageRenderDuration';

/**
 * Profiler statistics
 */
const ProfilerResults: FunctionComponent<{
  profilerResults: Array<ProfilerResult>;
}> = ({ profilerResults }) => {
  const frameBudget: number = Math.round((1000 / 60) * 100) / 100;

  // Render
  return (
    <>
      <h2>Profiler Results</h2>
      <h3>Timeline</h3>
      <div>
        <ProfilerLineChart profilerResults={profilerResults} width={1500} height={200} />
      </div>
      <div style={{ marginTop: '-24px' }}>
        <ProfilerFlameChart profilerResults={profilerResults} width={1500} height={64} />
      </div>
      <div style={{ display: 'flex' }}>
        <div>
          <h3>Update durations</h3>
          <ProfilerUpdateDurationBarChart profilerResults={profilerResults} width={600} height={150} />
        </div>
        <div>
          <h3>Render durations</h3>
          <ProfilerRenderDurationBarChart profilerResults={profilerResults} width={600} height={150} />
        </div>
      </div>
    </>
  );
};

export default ProfilerResults;
