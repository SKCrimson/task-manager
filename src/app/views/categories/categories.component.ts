import {Component, Input, OnInit} from '@angular/core';
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
  selectedCategory!: Category;

  constructor(private dataHandler: DataHandlerService) {
  }

  ngOnInit(): void {
  }

  showTasksByCategory(category: Category) {
    // this.selectedCategory = category;
    // this.dataHandler.fillTasksByCategory(category);
  }
}
