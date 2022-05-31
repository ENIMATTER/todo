import {CommonDAO} from "./CommonDAO";
import {Category} from "../../../model/Category";
import {Observable} from "rxjs";
import {Priority} from "../../../model/Priority";
import {Task} from "../../../model/Task";

export interface TaskDAO extends CommonDAO<Task> {

  //поиск задач по всем параметрам
  search (category: Category, searchText: string, status: boolean, priority: Priority): Observable<Task[]>;

  //количество завершенных задач в заданной категории
  getCompletedCountInCategory(category: Category): Observable<number>;

  //количество незавершенных задач в заданной категории
  getUncompletedCountInCategory(category: Category): Observable<number>;

  //количество всех задач в заданной категории
  getTotalCountInCategory(category: Category): Observable<number>;

  //количество всех завершенных задач в общем
  getCompletedCount(): Observable<number>;

}
