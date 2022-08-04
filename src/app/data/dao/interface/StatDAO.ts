import {Stat} from "../../../model/Stat";
import {Observable} from "rxjs";

export interface StatDAO {

  getOverallStat(): Observable<Stat>;

}
