import { Injectable } from '@angular/core';
import {PriorityDAO} from "../interface/PriorityDAO";
import {Priority} from "../../../model/Priority";
import {HttpClient} from "@angular/common/http";
import {PrioritySearchValues} from "../search/SearchObjects";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PriorityService implements PriorityDAO {

  url = 'http://localhost:8080/priority';

  constructor(private httpClient: HttpClient // для выполнения HTTP запросов
  ) {}

  findPriorities(prioritySearchValues: PrioritySearchValues) {
    return this.httpClient.post<Priority[]>(this.url + '/search', prioritySearchValues);
  }

  add(t: Priority): Observable<Priority> {
    return this.httpClient.post<Priority>(this.url + '/add', t);
  }

  delete(id: number): Observable<Priority> {
    return this.httpClient.delete<Priority>(this.url + '/delete/' + id);
  }

  findById(id: number): Observable<Priority> {
    return this.httpClient.get<Priority>(this.url + '/id/' + id);
  }

  findAll(): Observable<Priority[]> {
    return this.httpClient.get<Priority[]>(this.url + '/all');
  }

  update(t: Priority): Observable<Priority> {
    return this.httpClient.put<Priority>(this.url + '/update', t);
  }

}

