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
   * Flag, describing whether the next render has already been scheduled
   */
  private isNextRenderScheduled: boolean;

  /**
   * Constructor
   */
  constructor() {
    this.scheduledTasks = [];
    this.isNextRenderScheduled = false;
  }

  /**
   * Schedule a new task
   *
   * @param task Task
   */
  public scheduleTask(task: Function): void {
    // Schedule the task
    this.scheduledTasks.push(task);

    // Schedule the next render (if not yet done)
    if (!this.isNextRenderScheduled) {
      this.scheduleTaskExecution();
    }
  }

  /**
   * Schedule task execution
   */
  private async scheduleTaskExecution(): Promise<void> {
    // Mark next render as scheduled
    this.isNextRenderScheduled = true;

    // Wait until next opportunity to render
    setTimeout(() => {
      // Unmark next render as scheduled
      this.isNextRenderScheduled = false;

      // Get tasks to be applied
      const scheduledTasksToBeApplied: Array<Function> = this.scheduledTasks;
      this.scheduledTasks = [];

      // Run all tasks batched (and in correct order)
      batchedUpdates((): void => {
        for (let i = 0; i < scheduledTasksToBeApplied.length; i++) {
          scheduledTasksToBeApplied[i]();
        }
      });
    }, 0);
  }
}
