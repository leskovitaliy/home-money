import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ICategory } from '../../interfaces/category';
import { CategoriesService } from '../../services/categories.service';

@Component({
  selector: 'app-records',
  templateUrl: './records.component.html',
  styleUrls: ['./records.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RecordsComponent implements OnInit {
  categories: ICategory[] = [];
  isLoaded = false;

  constructor(private categoriesService: CategoriesService,
              private cdr: ChangeDetectorRef) { }

  ngOnInit() {
    this.categoriesService.getCategories()
      .subscribe((categories: ICategory[]) => {
        this.isLoaded = true;
        this.categories = categories;
        this.cdr.detectChanges();
      });
  }

  addCategory(category: ICategory) {
    this.categories.push(category);
  }

  categoryEdit(category: ICategory) {
    const index = this.categories
      .findIndex(currentCategory => currentCategory.id === category.id);

    this.categories[index] = category;
  }

}
