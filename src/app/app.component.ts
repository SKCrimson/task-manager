import {Component, OnInit} from '@angular/core';
import {DataHandlerService} from "./service/data-handler-service.service";
import {Task} from "./model/Task";
import {Category} from "./model/Category";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'Тask Мanager';

  tasks!: Task[];
  categories!: Category[];

  selectedCategory: Category | undefined;

  constructor(private dataHandler: DataHandlerService) {
  }

  ngOnInit(): void {
    this.dataHandler.getAllCategories().subscribe(categories => this.categories = categories);
    this.onSelectCategory(undefined);
  }

  onSelectCategory(category: Category | undefined) {
    this.selectedCategory = category;
    this.searchTaskByCategory();
  }

  onUpdateTask(task: Task): void {
    this.dataHandler.updateTask(task).subscribe(() => this.searchTaskByCategory());
  }

  onDeleteTask(task: Task): void {
    if (this.dataHandler.deleteTask(task.id))
      this.searchTaskByCategory();
  }

  private searchTaskByCategory() {
    this.dataHandler.searchTasks(
      this.selectedCategory,
      undefined,
      undefined,
      undefined
    ).subscribe(tasks => {
      this.tasks = tasks;
    });
  }
}
