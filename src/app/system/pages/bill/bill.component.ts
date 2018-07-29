import { Component, OnDestroy, OnInit } from '@angular/core';
import { combineLatest } from 'rxjs';
import { takeWhile, tap } from 'rxjs/operators';
import { BillService } from '../../services/bill.service';

@Component({
  selector: 'app-bill',
  templateUrl: './bill.component.html',
  styleUrls: ['./bill.component.scss']
})
export class BillComponent implements OnInit, OnDestroy {

  private _alive = true;

  constructor(private billService: BillService) {
  }

  ngOnInit() {
    combineLatest(
      this.billService.getBill(),
      this.billService.getCurrency()
    ).pipe(
      takeWhile(() => this._alive),
      tap(data => {
        console.log('data: ', data);
      })
    ).subscribe();
  }

  ngOnDestroy() {
   this._alive = false;
  }

}
