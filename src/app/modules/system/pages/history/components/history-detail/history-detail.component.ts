import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { ICategory } from '../../../../interfaces/category';
import { IEvent } from '../../../../interfaces/event';
import { CategoriesService } from '../../../../services/categories.service';
import { EventsService } from '../../../../services/events.service';

@Component({
  selector: 'app-history-detail',
  templateUrl: './history-detail.component.html',
  styleUrls: ['./history-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HistoryDetailComponent implements OnInit, OnDestroy {
  isLoaded = false;
  routeParams$: Subscription;

  event: IEvent;
  category: ICategory;

  constructor(private route: ActivatedRoute,
              private eventsService: EventsService,
              private categoriesService: CategoriesService,
              private cdr: ChangeDetectorRef) { }

  ngOnInit() {
    this.route.params
      .pipe(
        mergeMap((params: Params) => this.eventsService.getEventById(params['id'])),
        mergeMap((event: IEvent) => {
          this.event = event;
          return this.categoriesService.getCategoryById(event.category);
        })
      )
      .subscribe((category: ICategory) => {
        this.category = category;
        this.isLoaded = true;
        this.cdr.detectChanges();
      });
  }

  ngOnDestroy() {
    if (this.routeParams$) {
      this.routeParams$.unsubscribe();
    }
  }

}
