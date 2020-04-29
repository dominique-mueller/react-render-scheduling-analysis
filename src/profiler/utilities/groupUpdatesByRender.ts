import { ProfilerResult } from '../Profiler.interfaces';

/**
 * Group updates by render
 */
export const groupUpdatesByRender = (profilerResults: Array<ProfilerResult>): Array<Array<ProfilerResult>> => {
  return profilerResults.reduce((profilerResultsGroupedByRender: Array<Array<ProfilerResult>>, profilerResult: ProfilerResult) => {
    if (profilerResultsGroupedByRender[profilerResult.execution] === undefined) {
      profilerResultsGroupedByRender[profilerResult.execution] = [];
    }
    profilerResultsGroupedByRender[profilerResult.execution].push(profilerResult);
    return profilerResultsGroupedByRender;
  }, []);
};
