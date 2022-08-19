import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {Category} from "../../model/Category";
import {DataHandlerService} from "../../service/data-handler-service.service";
import {EditCategoryDialogComponent} from "../../dialog/edit-category-dialog/edit-category-dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {OpenType} from "../../dialog/OpenType";
import {DeviceDetectorService} from "ngx-device-detector";

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

  categoryMap!: Map<Category, number>;

  @Input('categoryMap')
  set setCategoryMap(categoryMap: Map<Category, number>) {
    this.categoryMap = categoryMap;
  }

  @Input()
  uncompletedTotal: number | undefined;

  @Output()
  actualCategory = new EventEmitter<Category>();

  // удалили категорию
  @Output()
  deleteCategory = new EventEmitter<Category>();

  // изменили категорию
  @Output()
  updateCategory = new EventEmitter<Category>();

  @Output()
  addCategory = new EventEmitter<string>();

  @Output()
  searchCategory = new EventEmitter<string>();

  indexMouseMove: number | undefined;
  searchCategoryTitle: string | undefined;
  isMobile!: boolean;

  constructor(private dataHandler: DataHandlerService, private dialog: MatDialog, private deviceService: DeviceDetectorService) {
    this.isMobile = deviceService.isMobile() ? true : deviceService.isTablet();
  }

  ngOnInit(): void {
  }

  showTasksByCategory(category: Category | undefined): void {

    if (this.selectedCategory === category)
      return;

    this.selectedCategory = category;
    this.actualCategory.emit(this.selectedCategory);
  }

  showEditIcon(index: number | undefined): void {
    this.indexMouseMove = index;
  }

  openEditDialog(category: Category): void {
    const dialogRef = this.dialog.open(EditCategoryDialogComponent, {
      data: [category.title, 'Редактирование категории', OpenType.EDIT],
      width: '500px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'delete') {
        this.deleteCategory.emit(category);
        return;
      }

      if (result as string) {
        category.title = result as string;
        this.updateCategory.emit(category);
        return;
      }
    });
  }

  openAddCategoryDialog() {
    const dialogRef = this.dialog.open(EditCategoryDialogComponent, {
      data: ['', 'Добавление категории', OpenType.ADD],
      width: '500px'
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result)
        this.addCategory.emit(result as string);
    });
  }

  search() {
    this.searchCategory.emit(this.searchCategoryTitle);
  }
}
