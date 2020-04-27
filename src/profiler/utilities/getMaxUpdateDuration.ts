import { ProfilerResult } from '../Profiler.interfaces';

/**
 * Get maximum update duration
 */
export const getMaxUpdateDuration = (profilerResults: Array<ProfilerResult>): number => {
  return Math.max(
    ...profilerResults.map((profilerResult: ProfilerResult): number => {
      return profilerResult.actualDuration;
    }),
  );
};
