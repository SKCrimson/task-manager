// стандартные методы CRUD (create, read, udpate, delete)

import {Observable} from 'rxjs';

export interface CommonDAO<T> {

  getAll(): Observable<T[]>;

  get(id: number): Observable<T | undefined>;

  update(type: T): Observable<T>;

  delete(id: number): Observable<T>;

  add(type: T): Observable<T>;

}
