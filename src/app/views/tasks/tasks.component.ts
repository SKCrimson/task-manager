import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {Task} from "../../model/Task";
import {DataHandlerService} from "../../service/data-handler-service.service";

import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from "@angular/material/sort";

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = ['color', 'id', 'title', 'date', 'priority', 'category'];

  dataSource!: MatTableDataSource<Task>;
  tasks!: Task[];

  @ViewChild(MatPaginator, {static: false}) private paginator!: MatPaginator;
  @ViewChild(MatSort, {static: false}) private sort!: MatSort;

  constructor(private dataHandler: DataHandlerService) {
  }

  ngOnInit() {
    this.dataHandler.tasksSubject.subscribe(tasks => this.tasks = tasks);
    this.refreshTable();
  }

  ngAfterViewInit(): void {
    this.addTableObjects();
  }

  toggleTaskCompleted(task: Task) {
    task.completed = !task.completed;
  }

  private refreshTable() {
    if (this.dataSource == null)
      this.dataSource = new MatTableDataSource<Task>(this.tasks);
    else
      this.dataSource.data = this.tasks;

    this.addTableObjects();

    // @ts-ignore - показывает ошибку для типа даты, но так работает, т.к. можно возвращать любой тип
    this.dataSource.sortingDataAccessor = (task, colName) => {
      switch (colName) {
        case 'priority': {
          return task.priority ? task.priority.id : null;
        }
        case 'category': {
          return task.category ? task.category.title : null;
        }
        case 'date': {
          return task.date ? task.date : null;
        }
        case 'title': {
          return task.title;
        }
      }
    };
  }

  getPriorityColor(task: Task) {
    // цвет завершенной задачи
    if (task.completed)
      return '#F8F9FA'; //TODO вынести цвета в константы (magic strings, magic numbers)

    if (task.priority && task.priority.color)
      return task.priority.color;

    return '#fff'
  }

  private addTableObjects() {
    this.dataSource.paginator = this.paginator; // обновить компонент постраничности (кол-во записей, страниц)
    this.dataSource.sort = this.sort; // компонент для сортировки данных (если необходимо)
  }
}
