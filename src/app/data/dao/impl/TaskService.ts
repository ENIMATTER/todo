import {Observable} from 'rxjs';
import {Inject, Injectable, InjectionToken} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {CommonService} from './CommonService';
import { Task } from 'src/app/model/Task';
import {TaskDAO} from "../interface/TaskDAO";
import {TaskSearchValues} from "../search/SearchObjects";

export const TASK_URL_TOKEN = new InjectionToken<string>('url');

@Injectable({
  providedIn: 'root'
})

export class TaskService extends CommonService<Task> implements TaskDAO {


  constructor(@Inject(TASK_URL_TOKEN) private baseUrl: any,
              private http: HttpClient // для выполнения HTTP запросов
  ) {
    super(baseUrl, http);
  }

  findTasks(taskSearchValues: TaskSearchValues): Observable<any> { // из backend получаем тип Page, поэтому указываем any
    return this.http.post<any>(this.baseUrl + '/search', taskSearchValues);
  }

}
