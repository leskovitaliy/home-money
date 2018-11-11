import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { IBill } from '../../interfaces/bill';

@Component({
  selector: 'app-bill-card',
  templateUrl: './bill-card.component.html',
  styleUrls: ['./bill-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BillCardComponent implements OnInit {
  @Input() bill: IBill;
  @Input() currency: any;

  dollar: number;
  euro: number;

  constructor() { }

  ngOnInit() {
    const { rates } = this.currency;
    this.dollar = rates['USD'] * this.bill.value;
    this.euro = rates['EUR'] * this.bill.value;
  }

}
