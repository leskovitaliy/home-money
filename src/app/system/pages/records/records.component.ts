import { Component, OnInit } from '@angular/core';
import { ICategory } from '../../interfaces/category';
import { CategoriesService } from '../../services/categories.service';

@Component({
  selector: 'app-records',
  templateUrl: './records.component.html',
  styleUrls: ['./records.component.scss']
})
export class RecordsComponent implements OnInit {

  categories: ICategory[] = [];
  isLoaded = false;

  constructor(private categoriesService: CategoriesService) { }

  ngOnInit() {
    this.categoriesService.getCategories()
      .subscribe((categories: ICategory[]) => {
        this.categories = categories;
        this.isLoaded = true;
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
