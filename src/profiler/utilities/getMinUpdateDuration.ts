import { ProfilerResult } from '../Profiler.interfaces';

/**
 * Get minimum update duration
 */
export const getMinUpdateDuration = (profilerResults: Array<ProfilerResult>): number => {
  return Math.min(
    ...profilerResults.map((profilerResult: ProfilerResult): number => {
      return profilerResult.actualDuration;
    }),
  );
};
