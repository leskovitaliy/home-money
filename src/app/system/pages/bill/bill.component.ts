import { Component, OnDestroy, OnInit } from '@angular/core';
import { combineLatest, pipe, Subscribable, Subscription } from 'rxjs';
import { delay, takeWhile, tap } from 'rxjs/operators';
import { IBill } from '../../interfaces/bill';
import { BillService } from '../../services/bill.service';

@Component({
  selector: 'app-bill',
  templateUrl: './bill.component.html',
  styleUrls: ['./bill.component.scss']
})
export class BillComponent implements OnInit, OnDestroy {

  bill$: Subscription;
  currency$: Subscription;

  private _alive = true;

  currency: any;
  bill: IBill;

  isLoaded = false;

  constructor(private billService: BillService) {
  }

  ngOnInit() {
    this.bill$ = combineLatest(
      this.billService.getBill(),
      this.billService.getCurrency()
    ).pipe(
      takeWhile(() => this._alive),
      tap(data => {
        this.bill = data[0];
        this.currency = data[1];
        this.isLoaded = true;
      })
    ).subscribe();
  }

  ngOnDestroy() {
   this._alive = false;
   this.bill$.unsubscribe();
   this.currency$.unsubscribe();
  }

  onRefresh() {
    this.isLoaded = false;
    this.currency$ = this.billService.getCurrency()
      .pipe(delay(500))
      .subscribe((currency: any) => {
        this.currency = currency;
        this.isLoaded = true;
      });
  }

}
