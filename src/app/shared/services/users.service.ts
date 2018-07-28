import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {pluckAndCatch} from '../utils/response-formater';

@Injectable()
export class UsersService {

  constructor(private http: HttpClient) { }

  getUserByEmail(email: string): Observable<any> {
    return this.http.get(`http://localhost:3000/users?email=${email}`)
      .pipe(pluckAndCatch);
  }
}
