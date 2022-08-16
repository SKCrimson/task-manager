import {PriorityDAO} from "../interface/PriorityDAO";
import {Observable, of} from "rxjs";
import {Priority} from "../../../model/Priority";
import {TestData} from "../../TestData";

export class PriorityDAOArray implements PriorityDAO {

  get(id: number): Observable<Priority | undefined> {
    return new Observable<Priority>();
  }

  getAll(): Observable<Priority[]> {
    return of(TestData.priorities);
  }

  add(priority: Priority): Observable<Priority> {
    if (priority.id === 0)
      priority.id = this.getLastIdPriority();

    TestData.priorities.push(priority);

    return of(priority);
  }

  private getLastIdPriority(): number {
    return Math.max.apply(Math, TestData.priorities.map(p => p.id)) + 1;
  }

  update(priority: Priority): Observable<Priority> {
    const tmpPriority = TestData.priorities.find(p => p.id === priority.id);

    if (tmpPriority != null)
      TestData.priorities.splice(TestData.priorities.indexOf(tmpPriority), 1, priority);

    return of(priority);
  }

  delete(id: number): boolean {
    TestData.tasks.forEach(t => {
      if (t.priority?.id === id)
        t.priority = undefined;
    });

    const tmpPriority = TestData.priorities.find(p => p.id === id);

    if (tmpPriority != null) {
      TestData.priorities.splice(TestData.priorities.indexOf(tmpPriority), 1);
      return true;
    }

    return false;
  }
}
