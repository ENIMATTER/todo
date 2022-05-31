import {Observable} from "rxjs";

export interface CommonDAO<T> {

  add(T: T): Observable<T>;

  get(id: number): Observable<T>;

  delete(id: number): Observable<T>;

  update(T: T): Observable<T>;

  getAll(): Observable<T[]>;

}
