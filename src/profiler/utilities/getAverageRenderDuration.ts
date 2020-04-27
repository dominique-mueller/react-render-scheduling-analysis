import { ProfilerResult } from '../Profiler.interfaces';
import { getRenderDurations } from './getRenderDurations';

/**
 * Get average render duration
 */
export const getAverageRenderDuration = (profilerResults: Array<ProfilerResult>): number => {
  const renderDurations: Array<number> = getRenderDurations(profilerResults);
  return (
    renderDurations.reduce((completeDuration: number, renderDuration: number): number => {
      return completeDuration + renderDuration;
    }, 0) / renderDurations.length
  );
};
