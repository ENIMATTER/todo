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
    TestData.tasks.forEach(task =>{
      if(task.category && task.category.id ===id){
        task.category=undefined;
      }
    })

    const categoryTmp = TestData.categories.find(t => t.id === id);
    // @ts-ignore
    TestData.categories.splice(TestData.categories.indexOf(categoryTmp), 1);
    // @ts-ignore
    return of(categoryTmp);
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

  update(category: Category): Observable<Category> {
    const categoryTmp = TestData.categories.find(t => t.id === category.id);
    // @ts-ignore
    TestData.categories.splice(TestData.categories.indexOf(categoryTmp), 1, category);
    return of(category);
  }

}
