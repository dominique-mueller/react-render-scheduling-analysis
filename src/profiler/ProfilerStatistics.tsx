import React, { FunctionComponent } from 'react';
import { ProfilerResult } from './Profiler.interfaces';

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

  // Render
  return (
    <>
      <h2>Statistics</h2>
      <p>Number of renderings: {profilerResults.length}</p>
      <p>Average render duration: {averageDuration}ms</p>
      <p>Min render duration: {minDuration}ms</p>
      <p>Max render duration: {maxDuration}ms</p>
    </>
  );
};

export default ProfilerStatistics;
