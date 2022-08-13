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

  add(task: Task): Observable<Task> {
    if (task.id === 0)
      task.id = this.getLastIdTask();

    TestData.tasks.push(task);

    return of(task);
  }

  private getLastIdTask(): number {
    return Math.max.apply(Math, TestData.tasks.map(task => task.id)) + 1;
  }

  update(task: Task): Observable<Task> {

    const taskTmp = TestData.tasks.find(t => t.id === task.id);

    if (taskTmp != null)
      TestData.tasks.splice(TestData.tasks.indexOf(taskTmp), 1, task);

    return of(task);
  }

  delete(id: number): boolean {
    const taskTmp = TestData.tasks.find(t => t.id === id);

    if (taskTmp != null) {
      TestData.tasks.splice(TestData.tasks.indexOf(taskTmp), 1);
      return true;
    }

    return false;
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

  search(category: Category | undefined, searchText: string | undefined, status: boolean | undefined, priority: Priority | undefined): Observable<Task[]> {
    return of(this.searchTasks(category, searchText, status, priority));
  }

  private searchTasks(category: Category | undefined, searchText: string | undefined, status: boolean | undefined, priority: Priority | undefined): Task[] {

    let allTasks = TestData.tasks;

    if (category != null)
      allTasks = allTasks.filter(task => task.category === category);

    if (status != null)
      allTasks = allTasks.filter(task => task.completed === status);

    if (priority != null)
      allTasks = allTasks.filter(task => task.priority === priority);

    if (searchText != null)
      allTasks = allTasks.filter(task => task.title.toLowerCase().includes(searchText.toLowerCase()));

    return allTasks;
  }
}
