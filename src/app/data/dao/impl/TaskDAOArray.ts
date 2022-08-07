import {TaskDAO} from "../interface/TaskDAO";
import {Category} from "../../../model/Category";
import {Priority} from "../../../model/Priority";
import {Task} from 'src/app/model/Task';

import {Observable, of} from "rxjs";
import {TestData} from "../../TestData";

export class TaskDAOArray implements TaskDAO {

  getAll(): Observable<Task[]> {
    return of(TestData.tasks);
  }

  get(id: number): Observable<Task | undefined> {
    return of(TestData.tasks.find(t => t.id === id));
  }

  add(type: Task): Observable<Task> {
    return new Observable<Task>();
  }

  delete(id: number): Observable<Task> {
    return new Observable<Task>();
  }

  getCompletedCountInCategory(category: Category): Observable<number> {
    return new Observable<number>();
  }

  getTotalCount(): Observable<number> {
    return new Observable<number>();
  }

  getTotalCountInCategory(category: Category): Observable<number> {
    return new Observable<number>();
  }

  getUncompletedCountInCategory(category: Category): Observable<number> {
    return new Observable<number>();
  }

  search(category: Category, searchText: string, status: boolean, priority: Priority): Observable<Task[]> {
    return new Observable<Task[]>();
  }

  update(type: Task): Observable<Task> {
    return new Observable<Task>();
  }

}
