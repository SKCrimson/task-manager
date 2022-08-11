import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {Category} from "../../model/Category";
import {DataHandlerService} from "../../service/data-handler-service.service";

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {

  @Input()
  categories!: Category[];

  @Input()
  selectedCategory: Category | undefined;

  @Output()
  actualCategory = new EventEmitter<Category>();

  constructor(private dataHandler: DataHandlerService) {
  }

  ngOnInit(): void {
  }

  showTasksByCategory(category: Category): void {

    if (this.selectedCategory === category)
      return;

    this.selectedCategory = category;
    this.actualCategory.emit(this.selectedCategory);
  }
}
