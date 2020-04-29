import React, { FunctionComponent } from 'react';

import { ProfilerResult } from './Profiler.interfaces';
import ProfilerLineChart from './charts/ProfilerLineChart';
import ProfilerFlameChart from './charts/ProfilerFlameChart';
import ProfilerUpdateDurationBarChart from './charts/ProfilerUpdateDurationBarChart';
import ProfilerRenderDurationBarChart from './charts/ProfilerRenderDurationBarChart';

import './Profiler.styles.css';

/**
 * Profiler statistics
 */
const ProfilerResults: FunctionComponent<{
  profilerResults: Array<ProfilerResult>;
}> = ({ profilerResults }) => {
  // const frameBudget: number = Math.round((1000 / 60) * 100) / 100;

  // Render
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <div
          className="card"
          style={{
            display: 'flex',
            flexDirection: 'column',
            marginBottom: '32px',
          }}
        >
          <h3 className="card__title">Timeline</h3>
          <div className="card__content">
            <div>
              <ProfilerLineChart profilerResults={profilerResults} width={1280} height={200} />
            </div>
            <div style={{ marginTop: '-24px' }}>
              <ProfilerFlameChart profilerResults={profilerResults} width={1280} height={66} />
            </div>
          </div>
        </div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <div className="card" style={{ marginRight: '32px' }}>
          <h3 className="card__title">Update durations</h3>
          <div className="card__content">
            <ProfilerUpdateDurationBarChart profilerResults={profilerResults} width={600} height={150} />
          </div>
        </div>
        <div className="card">
          <h3 className="card__title">Render durations</h3>
          <div className="card__content">
            <ProfilerRenderDurationBarChart profilerResults={profilerResults} width={600} height={150} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilerResults;
