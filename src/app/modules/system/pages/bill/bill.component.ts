import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { combineLatest, Subscription } from 'rxjs';
import { delay, takeWhile, tap } from 'rxjs/operators';
import { IBill } from '../../interfaces/bill';
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
      tap(data => {
        this.bill = data[0];
        this.currency = data[1];
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
