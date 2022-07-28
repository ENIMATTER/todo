import { Injectable } from '@angular/core';
import {Stat} from "../../../model/Stat";
import {HttpClient} from "@angular/common/http";
import {StatDAO} from "../interface/StatDAO";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class StatService implements StatDAO{

  url = 'http://localhost:8080/stat';

  constructor(private http: HttpClient // для выполнения HTTP запросов
  ) { }

  // общая статистика
  getOverallStat(): Observable<Stat> {
    return this.http.get<Stat>(this.url);
  }

}
