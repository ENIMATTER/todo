import {PriorityDAO} from "../interface/PriorityDAO";
import {Priority} from "../../../model/Priority";
import {Observable} from "rxjs";

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
    // @ts-ignore
    return undefined;
  }

  update(T: Priority): Observable<Priority> {
    // @ts-ignore
    return undefined;
  }

}
