/**
 * Profiler result
 */
export interface ProfilerResult extends ProfilerOutput {
  timestamp: Date;
}

/**
 * Profiler output
 *
 * Note: Based on the arguments of "ProfilerOnRenderCallback"
 */
export interface ProfilerOutput {
  id: string;
  phase: 'mount' | 'update';
  actualDuration: number;
  baseDuration: number;
  startTime: number;
  commitTime: number;
  interactions: Set<{
    id: number;
    name: string;
    timestamp: number;
  }>;
}
