import {CommonDAO} from "./CommonDAO";
import {Stat} from "../../../model/Stat";
import {Observable} from "rxjs";

export interface StatDAO extends CommonDAO<Stat> {

  getOverallStat(): Observable<Stat>;

}
