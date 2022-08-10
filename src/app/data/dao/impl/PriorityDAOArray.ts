import {PriorityDAO} from "../interface/PriorityDAO";
import {Observable, of} from "rxjs";
import {Priority} from "../../../model/Priority";
import {TestData} from "../../TestData";

export class PriorityDAOArray implements PriorityDAO {
  add(type: Priority): Observable<Priority> {
    return new Observable<Priority>();
  }

  delete(id: number): boolean {
    return false;
  }

  get(id: number): Observable<Priority | undefined> {
    return new Observable<Priority>();
  }

  getAll(): Observable<Priority[]> {
    return of(TestData.priorities);
  }

  update(type: Priority): Observable<Priority> {
    return new Observable<Priority>();
  }

}
