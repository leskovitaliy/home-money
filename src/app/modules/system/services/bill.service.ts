import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseApi } from '../../../shared/core/base-api';
import { pluckAndCatch } from '../../../shared/utils/response-formater';
import { IBill } from '../interfaces/bill';

@Injectable()
export class BillService extends BaseApi {

  constructor(public http: HttpClient) {
    super(http);
  }

  getBill(): Observable<any> {
    return this.get('bill');
  }

  updateBill(bill: IBill): Observable<IBill> {
    return this.put('bill', bill);
  }

  getCurrency(base: string = 'EUR', symbols = `UAH, USD, EUR`) {
    const baseUrlFixerIo = 'http://data.fixer.io/api/latest?access_key=9865d912f3be89e428547340d10885c7';
    return this.http.get(baseUrlFixerIo + `&base=${base}&symbols=${symbols}`)
      .pipe(pluckAndCatch);
  }
}
