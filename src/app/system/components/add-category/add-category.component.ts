import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ICategory } from '../../interfaces/category';
import { CategoriesService } from '../../services/categories.service';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss']
})
export class AddCategoryComponent implements OnInit {

  @Output() onCategory = new EventEmitter();

  constructor(private categoriesService: CategoriesService) { }

  ngOnInit() {
  }

  onSubmit(form: NgForm) {
    const { name, capacity } = form.value;
    if (capacity < 0) {
      return;  // TODO: fix in html input when value less 0s
    }

    this.categoriesService.addCategory({ name, capacity })
      .subscribe((category: ICategory) => {
        form.reset();
        form.form.patchValue({capacity: 1});
        this.onCategory.emit(category);
        console.log('category', category);
      });
    console.log('form ', form.value);
  }

}