import { interval, Observable, of } from 'rxjs';
import { take, map, share, switchMap, delay } from 'rxjs/operators';

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
 * Create event stream
 */
export const createEventStream = ({ emitInterval, numberOfExecutions, numberOfGeneratedEvents }: any): Observable<any> => {
  return of(null).pipe(
    delay(10000),
    switchMap(() => {
      return interval(emitInterval);
    }),
    map(
      (): Array<Event> => {
        return [...Array(numberOfGeneratedEvents)].map((value: undefined, index: number): any => {
          return {
            id: index,
            color: getRandomColor(),
          };
        });
      },
    ),
    share(),
    take(numberOfExecutions),
  );
};
