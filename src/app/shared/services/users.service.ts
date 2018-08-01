import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import { BaseApi } from '../core/base-api';
import { IUser } from '../interface/user';
import {pluckAndCatch} from '../utils/response-formater';

@Injectable()
export class UsersService extends BaseApi {

  constructor(public http: HttpClient) {
    super(http);
  }
  getUserByEmail(email: string): Observable<any>  {
    return this.get(`users?email=${email}`);
  }

  createNewUser(user: IUser): Observable<any> {
    return this.post('users', user);
  }
}
