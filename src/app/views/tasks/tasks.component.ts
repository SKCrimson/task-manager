import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {Task} from "../../model/Task";
import {DataHandlerService} from "../../service/data-handler-service.service";

import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from "@angular/material/sort";
import {MatDialog} from "@angular/material/dialog";
import {EditTaskDialogComponent} from "../../dialog/edit-task-dialog/edit-task-dialog.component";
import {ConfirmDialogComponent} from "../../dialog/confirm-dialog/confirm-dialog.component";
import {Category} from "../../model/Category";
import {Priority} from "../../model/Priority";
import {OpenType} from "../../dialog/OpenType";

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {

  displayedColumns: string[] = ['color', 'id', 'title', 'date', 'priority', 'category', 'operations', 'select'];
  dataSource!: MatTableDataSource<Task>;

  tasks!: Task[];
  priorities!: Priority[];

  searchTaskText = '';
  selectedStatusFilter: boolean | undefined;
  selectedPriorityFilter: Priority | undefined | null;

  @Input('tasks')
  set setTasks(value: Task[]) {
    this.tasks = value;
    this.fillTable();
  }

  @Input('priorities')
  set setPriorities(priorities: Priority[]) {
    this.priorities = priorities;
  }

  @Input()
  actualCategory: Category | undefined;

  @Output()
  addTask = new EventEmitter<Task>();

  @Output()
  updateTask = new EventEmitter<Task>();

  @Output()
  deleteTask = new EventEmitter<Task>();

  @Output()
  selectCategory = new EventEmitter<Category>();

  @Output()
  filterByTitle = new EventEmitter<string>();

  @Output()
  filterByStatus = new EventEmitter<boolean | undefined>();

  @Output()
  filterByPriority = new EventEmitter<Priority | undefined>();

  @Output()
  clearFilters = new EventEmitter<any>();

  @ViewChild(MatPaginator, {static: false}) private paginator!: MatPaginator;
  @ViewChild(MatSort, {static: false}) private sort!: MatSort;

  constructor(private dataHandler: DataHandlerService, private dialog: MatDialog) {
  }

  ngOnInit() {
    this.fillTable();
  }

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
      data: [task, 'Редактирование задачи', OpenType.EDIT],
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

  openDeleteDialog(task: Task): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: '500px',
      data: {
        dialogTitle: 'Подтвердите действие',
        message: `Вы действительно хотите удалить задачу: "${task.title}"?`
      },
      autoFocus: false
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteTask.emit(task);
      }
    });
  }

  onToggleStatus(task: Task): void {
    task.completed = !task.completed;
    this.updateTask.emit(task);
  }

  onSelectCategory(category: Category): void {
    this.selectCategory.emit(category);
  }

  onFilterByTitle(): void {
    this.filterByTitle.emit(this.searchTaskText);
  }

  onFilterByStatus(value: boolean | undefined): void {
    if (value !== this.selectedStatusFilter) {
      this.selectedStatusFilter = value;
      this.filterByStatus.emit(this.selectedStatusFilter);
    }
  }

  onFilterByPriority(value: Priority | undefined): void {
    if (value != this.selectedPriorityFilter) {
      this.selectedPriorityFilter = value;
      this.filterByPriority.emit(this.selectedPriorityFilter);
    }
  }

  openAddTaskDialog(): void {
    const task = new Task(0, '', false, undefined, this.actualCategory, undefined);

    const dialogRef = this.dialog.open(EditTaskDialogComponent, {data: [task, 'Добавление задачи', OpenType.ADD]});
    dialogRef.afterClosed().subscribe(result => {
      if (result)
        this.addTask.emit(task);
    });
  }

  onClearFilters(): void {
    this.searchTaskText = '';
    this.selectedStatusFilter = undefined;
    this.selectedPriorityFilter = undefined;

    this.clearFilters.emit();
  }
}
