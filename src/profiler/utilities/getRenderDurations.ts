import { ProfilerResult } from '../Profiler.interfaces';
import { groupUpdatesByRender } from './groupUpdatesByRender';

/**
 * Get render durations
 */
export const getRenderDurations = (profilerResults: Array<ProfilerResult>): Array<number> => {
  return groupUpdatesByRender(profilerResults).map((profilerResultsForUpdate: Array<ProfilerResult>): number => {
    return profilerResultsForUpdate.reduce((completeDuration: number, profilerResultForUpdate: ProfilerResult): number => {
      return completeDuration + profilerResultForUpdate.actualDuration;
    }, 0);
  });
};
