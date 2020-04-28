import { interval, Observable } from 'rxjs';
import { take, map, share } from 'rxjs/operators';

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
  return interval(emitInterval).pipe(
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
