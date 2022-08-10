import {CategoryDAO} from "../interface/CategoryDAO";
import {Category} from "../../../model/Category";
import {Observable, of} from "rxjs";
import {TestData} from "../../TestData";

export class CategoryDAOArray implements CategoryDAO {

  getAll(): Observable<Category[]> {
    return of(TestData.categories);
  }

  get(id: number): Observable<Category | undefined> {
    return new Observable<Category>();
  }

  add(type: Category): Observable<Category> {
    return new Observable<Category>();
  }

  update(type: Category): Observable<Category> {
    return new Observable<Category>();
  }

  delete(id: number): boolean {
    return false;
  }

  search(title: string): Observable<Category[]> {
    return new Observable<Category[]>();
  }

}
