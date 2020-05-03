import { interval, Observable, of, OperatorFunction, Observer } from 'rxjs';
import { take, map, share, switchMap, delay } from 'rxjs/operators';

import { RenderScheduler } from './RenderScheduler';

/**
 * Get random color
 *
 * Inspired by <https://stackoverflow.com/questions/1484506/random-color-generator>
 */
export const getRandomColor = (): string => {
  const letters: string = '0123456789ABCDEF';
  let color: string = '#';
  for (let i: number = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

/**
 * RxJS operator that allows us to run code after values have been emitted to subscribers, synchronously
 */
const tapAfter = (callbackFn: () => unknown): OperatorFunction<Array<any>, Array<any>> => {
  return (sourceObservable: Observable<Array<any>>): Observable<Array<any>> => {
    return new Observable((observer: Observer<Array<any>>) => {
      // Collect frame metadata
      sourceObservable.subscribe({
        next: (value: Array<any>): void => {
          // Forward value
          observer.next(value);

          // Run callback function
          callbackFn();
        },
      });
    });
  };
};

/**
 * Create event stream
 */
export const createEventStream = (
  { emitInterval, numberOfExecutions, numberOfGeneratedEvents }: any,
  renderScheduler: RenderScheduler,
): Observable<any> => {
  return of(null).pipe(
    delay(10000),
    switchMap(() => {
      return interval(emitInterval);
    }),
    map(
      (): Array<any> => {
        return [...Array(numberOfGeneratedEvents)].map((value: undefined, index: number): any => {
          return {
            id: index,
            color: getRandomColor(),
          };
        });
      },
    ),
    tapAfter(() => {
      renderScheduler.flushTasks();
    }),
    share(),
    take(numberOfExecutions),
  );
};
