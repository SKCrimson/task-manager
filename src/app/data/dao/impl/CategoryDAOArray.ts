import {CategoryDAO} from "../interface/CategoryDAO";
import {Category} from "../../../model/Category";
import {Observable} from "rxjs";

export class CategoryDAOArray implements CategoryDAO {
  add(type: Category): Observable<Category> {
    return new Observable<Category>();
  }

  delete(id: number): Observable<Category> {
    return new Observable<Category>();
  }

  get(id: number): Observable<Category | undefined> {
    return new Observable<Category>();
  }

  getAll(): Observable<Category[]> {
    return new Observable<Category[]>();
  }

  search(title: string): Observable<Category[]> {
    return new Observable<Category[]>();
  }

  update(type: Category): Observable<Category> {
    return new Observable<Category>();
  }

}
