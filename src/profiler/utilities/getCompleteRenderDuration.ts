import { ProfilerResult } from '../Profiler.interfaces';
import { getRenderDurations } from './getRenderDurations';

/**
 * Get complete render duration
 */
export const getCompleteRenderDuration = (profilerResults: Array<ProfilerResult>): number => {
  return (
    Math.round(
      getRenderDurations(profilerResults).reduce((completeDuration: number, renderDuration: number): number => {
        return completeDuration + renderDuration;
      }, 0) * 100,
    ) / 100
  );
};
