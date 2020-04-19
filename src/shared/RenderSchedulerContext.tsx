import React, { Context, createContext, FunctionComponent, ReactElement, useContext } from 'react';

import { RenderScheduler } from './RenderScheduler';

/**
 * Render Scheduler context
 */
export const RenderSchedulerContext: Context<RenderScheduler> = createContext({} as any);

/**
 * Render scheduler provider
 */
export const RenderSchedulerProvider: FunctionComponent = ({ children }): ReactElement => {
  // Define state
  const renderScheduler: RenderScheduler = new RenderScheduler();

  // Render
  return <RenderSchedulerContext.Provider value={renderScheduler}>{children}</RenderSchedulerContext.Provider>;
};

/**
 * Use render scheduler
 */
export const useRenderScheduler: () => RenderScheduler = (): RenderScheduler => {
  return useContext(RenderSchedulerContext);
};
