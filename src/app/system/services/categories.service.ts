import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseApi } from '../../shared/core/base-api';
import { ICategory } from '../interfaces/category';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService extends BaseApi {

  constructor(public http: HttpClient) {
    super(http);
  }

  addCategory(category: ICategory): Observable<ICategory> {
    return this.post('categories', category);
  }
}
