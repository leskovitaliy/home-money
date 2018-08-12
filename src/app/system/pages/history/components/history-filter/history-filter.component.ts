import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ICategory } from '../../../../interfaces/category';

@Component({
  selector: 'app-history-filter',
  templateUrl: './history-filter.component.html',
  styleUrls: ['./history-filter.component.scss']
})
export class HistoryFilterComponent {

  selectedPeriod = 'd';

  timePeriods = [
    {
      type: 'd',
      label: 'День'
    },
    {
      type: 'w',
      label: 'Неделя'
    },
    {
      type: 'M',
      label: 'Месяц'
    }
  ];

  types = [
    {
      type: 'income',
      label: 'Доход'
    },
    {
      type: 'outcome',
      label: 'Расход'
    },
  ];

  selectedTypes = [];
  selectedCategories = [];

  @Input() categories: ICategory[] = [];

  @Output() onFilterCancel: EventEmitter<any> = new EventEmitter();
  @Output() onFilterApply: EventEmitter<any> = new EventEmitter();

  closeFilter() {
    this.selectedTypes = [];
    this.selectedCategories = [];
    this.selectedPeriod = 'd';
    this.onFilterCancel.emit();
  }

  handleChangeType({ checked, value }) {
    this.calculateInputParams('selectedTypes', checked, value);
  }

  handleChangeCategory({ checked, value }) {
    this.calculateInputParams('selectedCategories', checked, value);
  }

  applyFilter() {
    this.onFilterApply.emit({
      types: this.selectedTypes,
      categories: this.selectedCategories,
      period: this.selectedPeriod
    });
  }

  private calculateInputParams(field: string, checked: boolean, value: string) {
    if (checked) {
      this[field].indexOf(value) === -1 ? this[field].push(value) : null;
    } else {
      this[field] = this[field].filter(i => i !== value);
    }
  }

}
