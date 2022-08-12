import {Component, OnInit} from '@angular/core';
import {DataHandlerService} from "./service/data-handler-service.service";
import {Task} from "./model/Task";
import {Category} from "./model/Category";
import {Priority} from "./model/Priority";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'Тask Мanager';

  tasks!: Task[];
  categories!: Category[];
  priorities!: Priority[];

  selectedCategory: Category | undefined;
  searchTask: string | undefined;
  searchStatus: boolean | undefined;
  searchPriority: Priority | undefined;

  constructor(private dataHandler: DataHandlerService) {
  }

  ngOnInit(): void {
    this.dataHandler.getAllCategories().subscribe(categories => this.categories = categories);
    this.dataHandler.getAllPriorities().subscribe(items => this.priorities = items);

    this.onSelectCategory(undefined);
  }

  onSelectCategory(category: Category | undefined) {
    this.selectedCategory = category;
    this.searchTasks();
  }

  onUpdateTask(task: Task): void {
    this.dataHandler.updateTask(task).subscribe(() => this.searchTasks());
  }

  onDeleteTask(task: Task): void {
    if (this.dataHandler.deleteTask(task.id))
      this.searchTasks();
  }

  onUpdateCategory(category: Category) {
    this.dataHandler.updateCategory(category).subscribe(() => {
      this.onSelectCategory(this.selectedCategory);
    });
  }

  onDeleteCategory(category: Category) {
    if (this.dataHandler.deleteCategory(category.id)) {
      this.selectedCategory = undefined;
      this.onSelectCategory(this.selectedCategory);
    }
  }

  onFilterByTitle(searchTitle: string | undefined) {
    this.searchTask = searchTitle;
    this.searchTasks();
  }

  onFilterByStatus(searchStatus: boolean | undefined) {
    this.searchStatus = searchStatus;
    this.searchTasks();
  }

  onFilterByPriority(searchPriority: Priority | undefined) {
    this.searchPriority = searchPriority;
    this.searchTasks();
  }

  onClearFilter($event: any) {
    this.searchTask = undefined;
    this.searchStatus = undefined;
    this.searchPriority = undefined;

    this.searchTasks();
  }

  private searchTasks() {
    this.dataHandler.searchTasks(
      this.selectedCategory,
      this.searchTask,
      this.searchStatus,
      this.searchPriority
    ).subscribe(tasks => {
      this.tasks = tasks;
    });
  }
}
