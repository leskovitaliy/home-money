import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { combineLatest, Subscription } from 'rxjs';
import { IBill } from '../../interfaces/bill';
import { ICategory } from '../../interfaces/category';
import { IEvent } from '../../interfaces/event';
import { BillService } from '../../services/bill.service';
import { CategoriesService } from '../../services/categories.service';
import { EventsService } from '../../services/events.service';

@Component({
  selector: 'app-planning',
  templateUrl: './planning.component.html',
  styleUrls: ['./planning.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlanningComponent implements OnInit, OnDestroy {
  isLoaded = false;
  getData$: Subscription;
  bill: IBill;
  categories: ICategory[] = [];
  events: IEvent[] = [];

  constructor(private billService: BillService,
              private categoriesService: CategoriesService,
              private eventsService: EventsService,
              private cdr: ChangeDetectorRef) {
  }

  ngOnInit() {
    this.getData$ = combineLatest(
      this.billService.getBill(),
      this.categoriesService.getCategories(),
      this.eventsService.getEvents()
    )
      .subscribe((data: [IBill, ICategory[], IEvent[]]) => {
        this.bill = data[0];
        this.categories = data[1];
        this.events = data[2];
        this.isLoaded = true;
        this.cdr.detectChanges();
      });
  }

  ngOnDestroy() {
    if (this.getData$) {
      this.getData$.unsubscribe();
    }
  }

  getCategoryCost(category: ICategory): number {
    const categoryEvents = this.events.filter(e => +e.category === +category.id && e.type === 'outcome');
    return categoryEvents.reduce((total, e) => {
      total += e.amount;
      return total;
    }, 0);
  }

  getCategoryPercent(category: ICategory): string {
    return this.getPercent(category) + '%';
  }

  getColorClass(category: ICategory): string {
    const percent = this.getPercent(category);
    return percent < 60 ? 'success' : percent >= 100 ? 'danger' : 'warning';
  }

  private getPercent(category: ICategory): number {
    const percent = (100 * this.getCategoryCost(category)) / category.capacity;
    return percent > 100 ? 100 : percent;
  }

}
