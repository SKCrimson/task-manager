import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {Task} from "../../model/Task";
import {DataHandlerService} from "../../service/data-handler-service.service";

import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from "@angular/material/sort";
import {MatDialog} from "@angular/material/dialog";
import {EditTaskDialogComponent} from "../../dialog/edit-task-dialog/edit-task-dialog.component";

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {

  displayedColumns: string[] = ['color', 'id', 'title', 'date', 'priority', 'category'];
  dataSource!: MatTableDataSource<Task>;

  tasks!: Task[];

  @Input('tasks')
  set setTasks(value: Task[]) {
    this.tasks = value;
    this.fillTable();
  }

  @Output()
  updateTask = new EventEmitter<Task>();

  @Output()
  deleteTask = new EventEmitter<Task>();

  @ViewChild(MatPaginator, {static: false}) private paginator!: MatPaginator;
  @ViewChild(MatSort, {static: false}) private sort!: MatSort;

  constructor(private dataHandler: DataHandlerService, private dialog: MatDialog) {
  }

  ngOnInit() {
    this.fillTable();
  }

  // toggleTaskCompleted(task: Task) {
  //   task.completed = !task.completed;
  // }

  private fillTable(): void {
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

  getPriorityColor(task: Task): string {
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

  openEditTaskDialog(task: Task): void {
    const dialogRef = this.dialog.open(EditTaskDialogComponent, {
      data: [task, 'Редактирование задачи'],
      autoFocus: false
    });

    dialogRef.afterClosed().subscribe(result => {

      if (result === 'complete') {
        task.completed = true;
        this.updateTask.emit(task);
        return;
      }
      if (result === 'activate') {
        task.completed = false;
        this.updateTask.emit(task);
        return;
      }

      if (result === 'delete') {
        this.deleteTask.emit(task);
        return;
      }

      if (result as Task) {
        this.updateTask.emit(task);
        return;
      }
    });
  }
}
