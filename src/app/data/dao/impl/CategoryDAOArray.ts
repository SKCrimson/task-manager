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

  update(category: Category): Observable<Category> {
    const tmpCategory = TestData.categories.find(t => t.id === category.id);

    if (tmpCategory != null)
      TestData.categories.splice(TestData.categories.indexOf(tmpCategory), 1, category);

    return of(category);
  }

  delete(id: number): boolean {
    TestData.tasks.forEach(task => {
      if (task.category && task.category.id === id) {
        task.category = undefined;
      }
    });

    const tmpCategory = TestData.categories.find(t => t.id === id);

    if (tmpCategory != null) {
      TestData.categories.splice(TestData.categories.indexOf(tmpCategory), 1);
      return true;
    }

    return false;
  }

  search(title: string): Observable<Category[]> {
    return new Observable<Category[]>();
  }

}
