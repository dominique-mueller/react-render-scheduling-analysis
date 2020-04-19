import React, { createContext, Context, FunctionComponent, ReactElement, useContext } from 'react';

import { interval, Observable } from 'rxjs';
import { map, share } from 'rxjs/operators';
import { AppConfig } from '../AppConfig';

/**
 * Get random color
 *
 * Inspired by <https://stackoverflow.com/questions/1484506/random-color-generator>
 */
const getRandomColor = (): string => {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

/**
 * Event source
 */
const eventArray = [...Array(AppConfig.numberOfEvents)];
const eventSource: Observable<any> = interval(AppConfig.eventEmittingInterval).pipe(
  map(() => {
    return eventArray.map((value, index) => {
      return {
        id: index,
        color: getRandomColor(),
      };
    });
  }),
  share(),
);

/**
 * Event Context
 */
export const EventContext: Context<Observable<any>> = createContext({} as any);

/**
 * Event Provider
 */
export const EventProvider: FunctionComponent = ({ children }): ReactElement => {
  return <EventContext.Provider value={eventSource}>{children}</EventContext.Provider>;
};

/**
 * Use event stream
 */
export const useEventStream: () => Observable<any> = (): Observable<any> => {
  return useContext(EventContext);
};
