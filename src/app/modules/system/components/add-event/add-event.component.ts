import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { IMessage } from '../../../../shared/interface/message';
import { IBill } from '../../interfaces/bill';
import { ICategory } from '../../interfaces/category';
import { BillService } from '../../services/bill.service';
import { EventsService } from '../../services/events.service';
import * as moment from 'moment';

@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddEventComponent implements OnDestroy {
  @Input() categories: ICategory[] = [];

  types = [
    {
      type: 'income',
      label: 'Доход'
    },
    {
      type: 'outcome',
      label: 'Расход'
    }
  ];

  message: IMessage = {text: '', type: 'danger'};

  private getBill$: Subscription;
  private updateBill$: Subscription;

  constructor(private eventsService: EventsService,
              private billService: BillService,
              private cdr: ChangeDetectorRef) {
  }

  ngOnDestroy() {
    if (this.getBill$) {
      this.getBill$.unsubscribe();
    }

    if (this.updateBill$) {
      this.updateBill$.unsubscribe();
    }
  }

  private showMessage(text: string) {
    this.message.text = text;
    this.cdr.detectChanges();
    setTimeout(() => this.message.text = '', 5000);
  }

  onSubmit(form: NgForm) {
    const {amount, description, category, type} = form.value;

    if (+amount < 0) {
      return;
    }

    const currentDate = moment().format('DD.MM.YYYY HH:mm:ss');

    const event = {
      type,
      amount,
      category,
      date: currentDate,
      description
    };

    this.getBill$ = this.billService.getBill()
      .subscribe((bill: IBill) => {
        let value = 0;

        if (type === 'outcome') {
          if (+amount > bill.value) {
            // ошибка
            this.showMessage(`На счету недостаточно средств. Вам не хватает: ${amount - bill.value}`);
            return;
          } else {
            value = bill.value - amount;
          }
        } else {
          value += bill.value + amount;
        }

        this.updateBill$ = this.billService.updateBill({value, currency: bill.currency})
          .pipe(
            mergeMap(() => this.eventsService.addEvent(event))
          ).subscribe(() => {
            form.setValue({
              amount: 0,
              description: ' ',
              category: 1,
              type: 'outcome'
            });
          });
      });

  }

}
