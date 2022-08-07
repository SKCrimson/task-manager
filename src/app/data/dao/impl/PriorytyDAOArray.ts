import {PriorityDAO} from "../interface/PriorytyDAO";
import {Observable} from "rxjs";
import {Priority} from "../../../model/Priority";

export class PriorytyDAOArray implements PriorityDAO {
  add(type: Priority): Observable<Priority> {
    return undefined;
  }

  delete(id: number): Observable<Priority> {
    return undefined;
  }

  get(id: number): Observable<Priority> {
    return undefined;
  }

  getAll(): Observable<Priority[]> {
    return undefined;
  }

  update(type: Priority): Observable<Priority> {
    return undefined;
  }

}
