import { Component, Input, OnInit } from '@angular/core';
import { ICategory } from '../../../../interfaces/category';
import { IEvent } from '../../../../interfaces/event';

@Component({
  selector: 'app-history-events',
  templateUrl: './history-events.component.html',
  styleUrls: ['./history-events.component.scss']
})
export class HistoryEventsComponent implements OnInit {

  @Input() categories: ICategory[] = [];
  @Input() events: IEvent[] = [];

  constructor() { }

  ngOnInit() {
    this.events.forEach((item) => {
      item.categoryName = this.categories.find(c => +c.id === +item.category).name;
    });
  }

  getEventClass(e: IEvent) {
    return {
      'label': true,
      'label-danger': e.type === 'outcome',
      'label-success': e.type === 'income'
    };
  }

}
