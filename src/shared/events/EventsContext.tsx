import React, { createContext, Context, FunctionComponent, ReactElement, useContext } from 'react';

import { interval, Observable } from 'rxjs';
import { map, take, share } from 'rxjs/operators';

import { AppConfig } from '../../AppConfig';
import { getRandomColor } from './get-random-color';
import { Event } from './EventsContext.interfaces';

/**
 * Event source
 */
const eventsGenerateList: Array<undefined> = [...Array(AppConfig.numberOfEvents)];
const eventsSource: Observable<Array<Event>> = interval(AppConfig.eventEmittingInterval).pipe(
  map(
    (): Array<Event> => {
      return eventsGenerateList.map(
        (value: undefined, index: number): Event => {
          return {
            id: index,
            color: getRandomColor(),
          };
        },
      );
    },
  ),
  share(),
  take(AppConfig.profilerExecutions),
);

/**
 * Events Context
 */
export const EventsContext: Context<Observable<Array<Event>>> = createContext({} as any);

/**
 * Events Provider
 */
export const EventsProvider: FunctionComponent = ({ children }): ReactElement => {
  return <EventsContext.Provider value={eventsSource}>{children}</EventsContext.Provider>;
};

/**
 * Use event
 */
export const useEvents: () => Observable<Array<Event>> = (): Observable<Array<Event>> => {
  return useContext(EventsContext);
};
