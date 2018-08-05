import { Component, OnInit } from '@angular/core';
import { ICategory } from '../../interfaces/category';

@Component({
  selector: 'app-records',
  templateUrl: './records.component.html',
  styleUrls: ['./records.component.scss']
})
export class RecordsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  addCategory(category: ICategory) {
    // add to array
  }

}
