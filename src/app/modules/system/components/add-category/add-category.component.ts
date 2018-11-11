import { ChangeDetectionStrategy, Component, EventEmitter, OnDestroy, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ICategory } from '../../interfaces/category';
import { CategoriesService } from '../../services/categories.service';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddCategoryComponent implements OnDestroy {

  @Output() onCategory = new EventEmitter();

  private addCategory$: Subscription;

  constructor(private categoriesService: CategoriesService) {
  }

  ngOnDestroy() {
    if (this.addCategory$) {
      this.addCategory$.unsubscribe();
    }
  }

  onSubmit(form: NgForm) {
    const {name, capacity} = form.value;
    if (capacity < 0) {
      return;  // TODO: fix in html input when value less 0s
    }

    this.addCategory$ = this.categoriesService.addCategory({name, capacity})
      .subscribe((category: ICategory) => {
        form.reset();
        form.form.patchValue({capacity: 1});
        this.onCategory.emit(category);
        console.log('category', category);
      });
    console.log('form ', form.value);
  }

}
