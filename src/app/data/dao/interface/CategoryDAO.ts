import {CommonDAO} from "./CommonDAO";
import {Category} from "../../../model/Category";
import {Observable} from "rxjs";

export interface CategoryDAO extends CommonDAO<Category> {

  //поиск категорий по названию
  search (title: string): Observable<Category[]>;

}
