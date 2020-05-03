import { unstable_batchedUpdates as batchedUpdates } from 'react-dom';

/**
 * Render Scheduler
 */
export class RenderScheduler {
  /**
   * List of scheduled tasks
   */
  private scheduledTasks: Array<Function>;

  /**
   * Constructor
   */
  constructor() {
    this.scheduledTasks = [];
  }

  /**
   * Schedule a new task
   *
   * @param task Task
   */
  public scheduleTask(task: Function): void {
    // Schedule the task
    this.scheduledTasks.push(task);
  }

  /**
   * Flush scheduled tasks
   */
  public flushTasks(): void {
    // Get tasks to be applied
    const scheduledTasksToBeApplied: Array<Function> = this.scheduledTasks;
    this.scheduledTasks = [];

    // Run all tasks batched (and in correct order)
    batchedUpdates((): void => {
      for (let i = 0; i < scheduledTasksToBeApplied.length; i++) {
        scheduledTasksToBeApplied[i]();
      }
    });
  }
}
