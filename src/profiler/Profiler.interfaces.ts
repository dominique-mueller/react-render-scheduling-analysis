/**
 * Profiler result
 */
export interface ProfilerResult extends ProfilerOutput {
  execution: number;
  timestamp: Date;
}

/**
 * Profiler output
 *
 * Note: Based on the arguments of "ProfilerOnRenderCallback"
 */
export interface ProfilerOutput {
  actualDuration: number;
  baseDuration: number;
  commitTime: number;
  id: string;
  phase: 'mount' | 'update';
  startTime: number;
}
