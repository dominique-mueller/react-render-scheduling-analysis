import { ProfilerResult } from '../Profiler.interfaces';
import { getRenderDurations } from './getRenderDurations';

/**
 * Get maximum render duration
 */
export const getMaxRenderDuration = (profilerResults: Array<ProfilerResult>): number => {
  return Math.max(...getRenderDurations(profilerResults));
};
