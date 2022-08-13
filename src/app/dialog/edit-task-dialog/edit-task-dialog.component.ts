import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {DataHandlerService} from "../../service/data-handler-service.service";
import {Task} from "../../model/Task";
import {Category} from "../../model/Category";
import {Priority} from "../../model/Priority";
import {ConfirmDialogComponent} from "../confirm-dialog/confirm-dialog.component";
import {OpenType} from "../OpenType";

@Component({
  selector: 'app-edit-task-dialog',
  templateUrl: './edit-task-dialog.component.html',
  styleUrls: ['./edit-task-dialog.component.css']
})

export class EditTaskDialogComponent implements OnInit {

  constructor(
    private dialogRef: MatDialogRef<EditTaskDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private data: [Task, string, OpenType],
    private dataHandler: DataHandlerService,
    private dialog: MatDialog) {
  }

  task!: Task;

  dialogTitle!: string;
  tmpTitle!: string;

  categories!: Category[];
  tmpCategory: Category | undefined;

  priorities!: Priority[];
  tmpPriority: Priority | undefined;
  tmpDate: Date | undefined;

  openType!: OpenType;

  ngOnInit(): void {
    this.dialogTitle = this.data[1];

    this.dataHandler.getAllCategories().subscribe(items => this.categories = items);
    this.dataHandler.getAllPriorities().subscribe(items => this.priorities = items);

    this.task = this.data[0];
    this.tmpTitle = this.task.title;
    this.tmpCategory = this.task.category;
    this.tmpPriority = this.task.priority;
    this.tmpDate = this.task.date;

    this.openType = this.data[2];
  }

  onConfirm() {
    this.task.title = this.tmpTitle;
    this.task.category = this.tmpCategory;
    this.task.priority = this.tmpPriority;
    this.task.date = this.tmpDate;

    this.dialogRef.close(this.task);
  }

  onCancel() {
    this.dialogRef.close(null);
  }

  delete() {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: '500px',
      data: {
        dialogTitle: 'Подтвердите действие',
        message: `Вы действительно хотите удалить задачу: "${this.task.title}"?`
      },
      autoFocus: false
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.dialogRef.close('delete');
      }
    });
  }

  complete() {
    this.dialogRef.close("complete");
  }

  activate() {
    this.dialogRef.close("activate");
  }

  canEdit(): boolean{
    return this.openType === OpenType.EDIT;
  }
}
