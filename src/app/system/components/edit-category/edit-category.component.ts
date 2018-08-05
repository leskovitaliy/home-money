import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { IMessage } from '../../../shared/interface/message';
import { ICategory } from '../../interfaces/category';
import { CategoriesService } from '../../services/categories.service';

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.scss']
})
export class EditCategoryComponent implements OnInit, OnDestroy {
  currentCategoryId = 1;
  currentCategory: ICategory;

  message: IMessage = {text: '', type: 'success'};

  @Input() categories: ICategory[] = [];
  @Output() onCategoryEdit: EventEmitter<ICategory> = new EventEmitter();

  private updateCategory$: Subscription;

  constructor(private categoriesService: CategoriesService) {
  }

  ngOnInit() {
    this.onChangeCategory();
  }

  ngOnDestroy() {
    if (this.updateCategory$) {
      this.updateCategory$.unsubscribe();
    }
  }

  onSubmit(form: NgForm) {
    const {name, capacity} = form.value;

    if (capacity < 0) {
      return;  // TODO: fix in html input when value less 0s
    }

    const category = {name, capacity, id: +this.currentCategoryId};

    this.updateCategory$ = this.categoriesService.updateCategory(category)
      .subscribe((categoryUpdated: ICategory) => {
        this.onCategoryEdit.emit(categoryUpdated);
        this.message.text = 'Категория успешно отредактированна.';
        setTimeout(() => this.message.text = '', 5000);
      });
  }

  onChangeCategory() {
    this.currentCategory = this.categories
      .find((category) => category.id === +this.currentCategoryId);
  }

}
