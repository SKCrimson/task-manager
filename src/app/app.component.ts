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
  private searchCategoryText = '';

  constructor(private dataHandler: DataHandlerService) {
  }

  ngOnInit(): void {
    this.dataHandler.getAllCategories().subscribe(categories => this.categories = categories);
    this.dataHandler.getAllPriorities().subscribe(items => this.priorities = items);

    this.onSelectCategory(undefined);
  }

  onUpdateTask(task: Task): void {
    this.dataHandler.updateTask(task).subscribe(() => this.refreshTasks());
  }

  onDeleteTask(task: Task): void {
    if (this.dataHandler.deleteTask(task.id))
      this.refreshTasks();
  }

  onFilterByTitle(searchTitle: string | undefined) {
    this.searchTask = searchTitle;
    this.refreshTasks();
  }

  onFilterByStatus(searchStatus: boolean | undefined) {
    this.searchStatus = searchStatus;
    this.refreshTasks();
  }

  onFilterByPriority(searchPriority: Priority | undefined) {
    this.searchPriority = searchPriority;
    this.refreshTasks();
  }

  onClearFilter($event: any) {
    this.searchTask = undefined;
    this.searchStatus = undefined;
    this.searchPriority = undefined;

    this.refreshTasks();
  }

  onAddTask(task: Task) {
    this.dataHandler.addTask(task).subscribe(_ => {
      this.refreshTasks();
    });
  }

  private refreshTasks() {
    this.dataHandler.searchTasks(
      this.selectedCategory,
      this.searchTask,
      this.searchStatus,
      this.searchPriority
    ).subscribe(tasks => {
      this.tasks = tasks;
    });
  }

  onSelectCategory(category: Category | undefined) {
    this.selectedCategory = category;
    this.refreshCategories();
    this.refreshTasks();
  }

  onAddCategory(title: string) {
    this.dataHandler.addCategory(title).subscribe(() =>
      this.refreshCategories()
    );
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

  onSearchCategory(title: string) {
    //this.searchCategoryText = title;

    this.dataHandler.searchCategories(title).subscribe(categories => {
      this.categories = categories;
    });
  }

  private refreshCategories(){
    this.dataHandler.getAllCategories().subscribe(categories => this.categories = categories);
  }
}
