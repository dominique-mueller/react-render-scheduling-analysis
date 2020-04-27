import { ProfilerResult } from '../Profiler.interfaces';
import { getRenderDurations } from './getRenderDurations';

/**
 * Get minimum render duration
 */
export const getMinRenderDuration = (profilerResults: Array<ProfilerResult>): number => {
  return Math.min(...getRenderDurations(profilerResults));
};
