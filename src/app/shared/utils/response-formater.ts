import {Observable, throwError} from 'rxjs';
import { catchError, map, pluck } from 'rxjs/operators';


export const errorHandler = (observer: Observable<any>) => observer
  .pipe(catchError((error: any) => (error.error)));

export const pluckAndCatch = (observer: Observable<any>) => observer
  .pipe(
    map(res => {
      return { data: { ...res } };
    }),
    pluck('data'),
    catchError(error => throwError(error.error))
  );
