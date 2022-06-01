import { Injectable } from '@angular/core';
import {TaskDAOArray} from "../data/dao/impl/TaskDAOArray";
import {Observable} from "rxjs";
import {Task} from "../model/Task";
import {Category} from "../model/Category";
import {CategoryDAOArray} from "../data/dao/impl/CategoryDAOArray";

@Injectable({
  providedIn: 'root'
})
export class DataHandlerService {

  private taskDAOArray = new TaskDAOArray();
  private categoryDAOArray = new CategoryDAOArray();

  constructor() {
  }

  getAllTasks(): Observable<Task[]>{

    return this.taskDAOArray.getAll();

  }

  getAllCategories(): Observable<Category[]>{

    return this.categoryDAOArray.getAll();

  }

}
