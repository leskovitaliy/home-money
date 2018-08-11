import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, ObservableInput } from 'rxjs';
import { BaseApi } from '../../shared/core/base-api';
import { IEvent } from '../interfaces/event';

@Injectable({
  providedIn: 'root'
})
export class EventsService extends BaseApi {

  constructor(public http: HttpClient) {
    super(http);
  }

  addEvent(event: IEvent): Observable<IEvent> {
    return this.post('events', event);
  }

  getEvents(): Observable<any> {
    return this.getSimple('events');
  }

  getEventById(id: string): Observable<IEvent | any> {
    return this.get(`events/${id}`);
  }
}
