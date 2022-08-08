import {Injectable} from '@angular/core';
import {Category} from "../model/Category";
import {Task} from "../model/Task";
import {Observable} from "rxjs";
import {TaskDAOArray} from "../data/dao/impl/TaskDAOArray";
import {CategoryDAOArray} from "../data/dao/impl/CategoryDAOArray";
import {Priority} from "../model/Priority";

@Injectable({
  providedIn: 'root'
})
export class DataHandlerService {

  private taskDaoArray = new TaskDAOArray();
  private categoryDAOArray = new CategoryDAOArray();

  constructor() {
  }

  getAllCatigories(): Observable<Category[]> {
    return this.categoryDAOArray.getAll();
  }

  getAllTasks(): Observable<Task[]> {
    return this.taskDaoArray.getAll();
  }

  // поиск задач по параметрам
  searchTasks(category: Category | undefined, searchText: string | undefined, status: boolean | undefined, priority: Priority | undefined): Observable<Task[]> {
    return this.taskDaoArray.search(category, searchText, status, priority);
  }
}
