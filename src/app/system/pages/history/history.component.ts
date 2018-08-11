import { Component, OnDestroy, OnInit } from '@angular/core';
import { combineLatest, Subscription } from 'rxjs';
import { ICategory } from '../../interfaces/category';
import { IEvent } from '../../interfaces/event';
import { CategoriesService } from '../../services/categories.service';
import { EventsService } from '../../services/events.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent implements OnInit, OnDestroy {

  isLoaded = false;
  chartData = [];

  categories: ICategory[] = [];
  events: IEvent[] = [];

  data$: Subscription;

  constructor(private categoriesService: CategoriesService,
              private eventsService: EventsService) { }

  ngOnInit() {
    this.data$ = combineLatest(
      this.categoriesService.getCategories(),
      this.eventsService.getEvents()
    )
      .subscribe((data: [ICategory[], IEvent[]]) => {
        this.categories = data[0];
        this.events = data[1];

        this.calculateChartData();

        this.isLoaded = true;
      });
  }

  calculateChartData(): void {
    this.chartData = [];

    this.categories.forEach((category) => {
      const categoryEvents = this.events.filter((e) => +e.category === +category.id && e.type === 'outcome');
      this.chartData.push({
        name: category.name,
        value: categoryEvents.reduce((total, e) => {
          total += e.amount;
          return total;
        }, 0)
      });
    });
  }

  ngOnDestroy() {
    if (this.data$) {
      this.data$.unsubscribe();
    }
  }

}
