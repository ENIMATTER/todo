import {CategoryDAO} from "../interface/CategoryDAO";
import {Category} from "../../../model/Category";
import {Observable, of} from "rxjs";
import {TestData} from "../../TestData";

export class CategoryDAOArray implements CategoryDAO{
  add(T: Category): Observable<Category> {
    // @ts-ignore
    return undefined;
  }

  delete(id: number): Observable<Category> {
    // @ts-ignore
    return undefined;
  }

  get(id: number): Observable<Category> {
    // @ts-ignore
    return undefined;
  }

  getAll(): Observable<Category[]> {
    return of(TestData.categories);
  }

  search(title: string): Observable<Category[]> {
    // @ts-ignore
    return undefined;
  }

  update(T: Category): Observable<Category> {
    // @ts-ignore
    return undefined;
  }

}
