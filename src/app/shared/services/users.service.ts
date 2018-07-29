import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import { IUser } from '../interface/user';
import {pluckAndCatch} from '../utils/response-formater';

@Injectable()
export class UsersService {

  constructor(private http: HttpClient) { }

  getUserByEmail(email: string): Observable<any> {
    return this.http.get(`http://localhost:3000/users?email=${email}`)
      .pipe(pluckAndCatch);
  }

  createNewUser(user: IUser): Observable<any> {
    return this.http.post('http://localhost:3000/users', user)
      .pipe(pluckAndCatch);
  }
}
