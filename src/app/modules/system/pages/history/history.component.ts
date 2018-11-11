import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { combineLatest, Subscription } from 'rxjs';
import { ICategory } from '../../interfaces/category';
import { IEvent } from '../../interfaces/event';
import { CategoriesService } from '../../services/categories.service';
import { EventsService } from '../../services/events.service';
import * as moment from 'moment';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HistoryComponent implements OnInit, OnDestroy {

  isLoaded = false;
  chartData = [];

  categories: ICategory[] = [];
  events: IEvent[] = [];
  filterEvents: IEvent[] = [];

  data$: Subscription;

  constructor(private categoriesService: CategoriesService,
              private eventsService: EventsService,
              private cdr: ChangeDetectorRef) {
  }

  ngOnInit() {
    this.data$ = combineLatest(
      this.categoriesService.getCategories(),
      this.eventsService.getEvents()
    )
      .subscribe((data: [ICategory[], IEvent[]]) => {
        this.categories = data[0];
        this.events = data[1];

        this.setOriginalEvents();
        this.calculateChartData();

        this.isLoaded = true;
        this.cdr.detectChanges();
      });
  }

  calculateChartData(): void {
    this.chartData = [];

    this.categories.forEach((category) => {
      const categoryEvents = this.filterEvents.filter((e) => +e.category === +category.id && e.type === 'outcome');
      this.chartData.push({
        name: category.name,
        value: categoryEvents.reduce((total, e) => {
          total += e.amount;
          return total;
        }, 0)
      });
    });

    this.cdr.detectChanges();
  }

  ngOnDestroy() {
    if (this.data$) {
      this.data$.unsubscribe();
    }
  }

  onFilterApply(filterData) {
    this.setOriginalEvents();

    const startPeriod = moment().startOf(filterData.period).startOf('d');
    const endPeriod = moment().endOf(filterData.period).endOf('d');

    this.filterEvents = this.filterEvents
      .filter(e => {
        return filterData.types.indexOf(e.type) !== -1;
      })
      .filter(e => {
        return filterData.categories.indexOf(e.category.toString()) !== -1;
      })
      .filter(e => {
        const momentDate = moment(e.date, 'DD.MM.YYYY HH:mm:ss');
        return momentDate.isBetween(startPeriod, endPeriod);
      });

    this.calculateChartData();
    this.cdr.detectChanges();

  }

  onFilterCancel() {
    this.setOriginalEvents();
    this.calculateChartData();
    this.cdr.detectChanges();
  }

  private setOriginalEvents() {
    this.filterEvents = this.events.slice();
    this.cdr.detectChanges();
  }
}
