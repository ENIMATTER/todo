import {TaskDAO} from "../interface/TaskDAO";
import {Category} from "../../../model/Category";
import {Observable, of} from "rxjs";
import {Priority} from "../../../model/Priority";
import {Task} from 'src/app/model/Task';
import {TestData} from "../../TestData";

export class TaskDAOArray implements TaskDAO {

  getAll(): Observable<Task[]> {
    return of(TestData.tasks);
  }

  get(id: number): Observable<Task> {
    // @ts-ignore
    return undefined;
  }


  add(T: Task): Observable<Task> {
    // @ts-ignore
    return undefined;
  }

  delete(id: number): Observable<Task> {
    // @ts-ignore
    return undefined;
  }

  getCompletedCountInCategory(category: Category): Observable<number> {
    // @ts-ignore
    return undefined;
  }

  getTotalCount(): Observable<number> {
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

  // поиск задач по параметрам
  // если значение null - параметр не нужно учитывать при поиске
  search(category: Category, searchText: string, status: boolean, priority: Priority): Observable<Task[]> {
    return of(this.searchTodos(category, searchText, status, priority));
  }

  private searchTodos(category: Category, searchText: string, status: boolean, priority: Priority): Task[] {

    let allTasks = TestData.tasks;

    if (category != null) {
      allTasks = allTasks.filter(todo => todo.category === category);
    }

    return allTasks; // отфильтрованный массив
  }

  update(T: Task): Observable<Task> {
    // @ts-ignore
    return undefined;
  }

  getCompletedCount(): Observable<number> {
    // @ts-ignore
    return undefined;
  }
}
