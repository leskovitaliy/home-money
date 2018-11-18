import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { combineLatest, Subscription } from 'rxjs';
import { delay, takeWhile, tap } from 'rxjs/operators';
import { IBill } from '../../interfaces/bill';
import { ICurrency } from '../../interfaces/currency';
import { BillService } from '../../services/bill.service';

@Component({
  selector: 'app-bill',
  templateUrl: './bill.component.html',
  styleUrls: ['./bill.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BillComponent implements OnInit, OnDestroy {
  private _alive = true;

  currency: any;
  bill: IBill;

  isLoaded = false;
  isRefresh = false;

  bill$: Subscription;
  currency$: Subscription;

  constructor(private billService: BillService,
              private cdr: ChangeDetectorRef) {
  }

  ngOnInit() {
    this.bill$ = combineLatest(
      this.billService.getBill(),
      this.billService.getCurrency()
    ).pipe(
      takeWhile(() => this._alive),
      tap(([data, currency]: [IBill, ICurrency]) => {
        this.bill = data;
        this.currency = this.mapCurrency(currency);
        this.isLoaded = true;
        this.cdr.detectChanges();
      })
    ).subscribe();
  }

  ngOnDestroy() {
    this._alive = false;
    this.bill$.unsubscribe();
    if (this.currency$) {
      this.currency$.unsubscribe();
    }
  }

  mapCurrency(currency: ICurrency) {
    const { base, date, rates, success, timestamp } = currency;
    const _rates = {
      EUR: rates['UAH'],
      USD: parseInt(rates['UAH'], 10) / parseInt(rates['USD'], 10),
    };

    return {
      base,
      date,
      rates: _rates,
      success,
      timestamp
    };
  }

  onRefresh() {
    this.isLoaded = false;
    this.isRefresh = true;
    this.currency$ = this.billService.getCurrency()
      .pipe(delay(500))
      .subscribe((currency: any) => {
        this.currency = currency;
        this.isLoaded = true;
        this.isRefresh = false;
        this.cdr.detectChanges();
      });
  }

}
