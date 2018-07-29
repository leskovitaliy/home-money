import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { pluckAndCatch } from '../../shared/utils/response-formater';

@Injectable()
export class BillService {

  constructor(private http: HttpClient) { }

  getBill(): Observable<any> {
    return this.http.get('http://localhost:3000/bill')
      .pipe(pluckAndCatch);
  }

  getCurrency(base: string = 'UAH') {
    return this.http.get(`http://data.fixer.io/api/latest?access_key=9865d912f3be89e428547340d10885c7&symbols=${base}`)
      .pipe(pluckAndCatch);
  }
}
