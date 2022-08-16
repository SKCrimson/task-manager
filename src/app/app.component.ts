import {Component, OnInit} from '@angular/core';
import {DataHandlerService} from "./service/data-handler-service.service";
import {Task} from "./model/Task";
import {Category} from "./model/Category";
import {Priority} from "./model/Priority";
import {zip} from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'Тask Мanager';

  categoryMap = new Map<Category, number>();

  tasks!: Task[];
  categories!: Category[];
  priorities!: Priority[];

  selectedCategory: Category | undefined;
  searchTask: string | undefined;
  searchStatus: boolean | undefined;
  searchPriority: Priority | undefined;

  totalTasksCountInCategory!: number;
  completedCountInCategory!: number;
  uncompletedCountInCategory!: number;
  uncompletedTotalTasksCount!: number;

  showStat!: boolean;

  constructor(private dataHandler: DataHandlerService) {
  }

  ngOnInit(): void {
    this.dataHandler.getAllCategories().subscribe(categories => this.categories = categories);
    this.dataHandler.getAllPriorities().subscribe(items => this.priorities = items);

    this.onSelectCategory(undefined);
  }

  onAddTask(task: Task) {
    this.dataHandler.addTask(task).subscribe(_ => {
      this.updateTasksAndStat();
    });
  }

  onUpdateTask(task: Task): void {
    this.dataHandler.updateTask(task).subscribe(() => this.updateTasksAndStat());
  }

  onDeleteTask(task: Task): void {
    if (this.dataHandler.deleteTask(task.id))
      this.updateTasksAndStat();
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

  onClearFilter() {
    this.searchTask = undefined;
    this.searchStatus = undefined;
    this.searchPriority = undefined;

    this.refreshTasks();
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

  private updateTasksAndStat() {
    this.refreshTasks();
    this.updateStat();
  }

  private updateStat() {
    zip(
      this.dataHandler.getTotalCountInCategory(this.selectedCategory),
      this.dataHandler.getCompletedCountInCategory(this.selectedCategory),
      this.dataHandler.getUncompletedCountInCategory(this.selectedCategory),
      this.dataHandler.getUncompletedTotalCount())
      .subscribe(array => {
        this.totalTasksCountInCategory = array[0];
        this.completedCountInCategory = array[1];
        this.uncompletedCountInCategory = array[2];
        this.uncompletedTotalTasksCount = array[3];
      });
  }

  onSelectCategory(category: Category | undefined) {
    this.refreshCategories();
    this.selectedCategory = category;

    this.updateTasksAndStat();
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
    this.dataHandler.searchCategories(title).subscribe(categories => {
      this.categories = categories;
    });
  }

  private refreshCategories() {

    this.dataHandler.getAllCategories().subscribe(categories => this.categories = categories);

    if (this.categoryMap)
      this.categoryMap.clear();

    this.categories = this.categories.sort((a, b) => a.title.localeCompare(b.title));
    this.categories.forEach(c => {
      this.dataHandler.getUncompletedCountInCategory(c)
        .subscribe(count => this.categoryMap.set(c, count));
    })

  }

  toggleStat(showStat: boolean) {
    this.showStat = showStat;
  }
}
