import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { IBill } from '../../interfaces/bill';
import { ICurrency, IRates } from '../../interfaces/currency';

@Component({
  selector: 'app-bill-card',
  templateUrl: './bill-card.component.html',
  styleUrls: ['./bill-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BillCardComponent implements OnInit {
  @Input() bill: IBill;
  @Input() currency: ICurrency;

  dollar: number;
  uah: number;

  constructor() { }

  ngOnInit() {
    const rateUsd: number = parseInt(this.currency.rates['USD'], 10);

    this.uah = this.bill.value;
    this.dollar = rateUsd * this.bill.value;
  }

}
