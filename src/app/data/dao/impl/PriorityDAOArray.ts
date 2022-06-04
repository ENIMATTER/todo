import {PriorityDAO} from "../interface/PriorityDAO";
import {Priority} from "../../../model/Priority";
import {Observable, of} from "rxjs";
import {TestData} from "../../TestData";

export class PriorityDAOArray implements PriorityDAO{

  add(T: Priority): Observable<Priority> {
    // @ts-ignore
    return undefined;
  }

  delete(id: number): Observable<Priority> {
    // @ts-ignore
    return undefined;
  }

  get(id: number): Observable<Priority> {
    // @ts-ignore
    return undefined;
  }

  getAll(): Observable<Priority[]> {
    return of(TestData.priorities);
  }

  update(T: Priority): Observable<Priority> {
    // @ts-ignore
    return undefined;
  }

}
