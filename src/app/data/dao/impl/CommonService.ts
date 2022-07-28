import {Inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CommonService<T> {

  private readonly url: string;

  constructor(@Inject(String) url: string,  // базовый URL для доступа к данным
              private httpClient: HttpClient // для выполнения HTTP запросов
  ) {
    this.url = url;
  }

  add(t: T): Observable<T> {
    return this.httpClient.post<T>(this.url + '/add', t);
  }

  delete(id: number): Observable<T> {
    return this.httpClient.delete<T>(this.url + '/delete/' + id);
  }

  findById(id: number): Observable<T> {
    return this.httpClient.get<T>(this.url + '/id/' + id);
  }

  findAll(): Observable<T[]> {
    return this.httpClient.get<T[]>(this.url + '/all');
  }

  update(t: T): Observable<T> {
    return this.httpClient.put<T>(this.url + '/update', t);
  }

}

