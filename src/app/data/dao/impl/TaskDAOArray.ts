import {TaskDAO} from "../interface/TaskDAO";
import {Observable, of} from "rxjs";
import {Category} from "../../../model/Category";
import {Priority} from "../../../model/Priority";
import {Task} from "../../../model/Task";
import {TestData} from "../../TestData";

export class TaskDAOArray implements TaskDAO{

  add(T: Task): Observable<Task> {
    // @ts-ignore
    return undefined;
  }

  delete(id: number): Observable<Task> {
    // @ts-ignore
    return undefined;
  }

  get(id: number): Observable<Task> {
    // @ts-ignore
    //return of(TestData.tasks.find(todo => todo.id === id));
    return undefined;
  }

  getAll(): Observable<Task[]> {
    return of(TestData.tasks);
  }

  getCompletedCount(): Observable<number> {
    // @ts-ignore
    return undefined;
  }

  getCompletedCountInCategory(category: Category): Observable<number> {
    // @ts-ignore
    return undefined;
  }

  getTotalCountInCategory(category: Category): Observable<number> {
    // @ts-ignore
    return undefined;
  }

  getUncompletedCountInCategory(category: Category): Observable<number> {
    // @ts-ignore
    return undefined;
  }

  search(category: Category, searchText: string, status: boolean, priority: Priority): Observable<Task[]> {
    // @ts-ignore
    return undefined;
  }

  update(T: Task): Observable<Task> {
    // @ts-ignore
    return undefined;
  }

}
