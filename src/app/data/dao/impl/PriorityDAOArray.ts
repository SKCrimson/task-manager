import {PriorityDAO} from "../interface/PriorityDAO";
import {Observable} from "rxjs";
import {Priority} from "../../../model/Priority";

export class PriorityDAOArray implements PriorityDAO {
  add(type: Priority): Observable<Priority> {
    return new Observable<Priority>();
  }

  delete(id: number): Observable<Priority> {
    return new Observable<Priority>();
  }

  get(id: number): Observable<Priority | undefined> {
    return new Observable<Priority>();
  }

  getAll(): Observable<Priority[]> {
    return new Observable<Priority[]>();
  }

  update(type: Priority): Observable<Priority> {
    return new Observable<Priority>();
  }

}
