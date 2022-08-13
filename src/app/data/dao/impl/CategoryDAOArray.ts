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

  add(category: Category): Observable<Category> {
    if (category.id === 0)
      category.id = this.getLastIdCategory();

    TestData.categories.push(category);

    return of(category);
  }

  private getLastIdCategory(): number {
    return Math.max.apply(Math, TestData.categories.map(category => category.id)) + 1;
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
