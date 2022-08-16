import {Component, Inject, OnInit} from '@angular/core';
import {ConfirmDialogComponent} from '../confirm-dialog/confirm-dialog.component';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {OpenType} from "../OpenType";

@Component({
  selector: 'app-edit-category-dialog',
  templateUrl: './edit-category-dialog.component.html',
  styleUrls: ['./edit-category-dialog.component.css']
})
export class EditCategoryDialogComponent implements OnInit {

  dialogTitle!: string;
  categoryTitle!: string;
  openType!: OpenType;

  constructor(
    private dialogRef: MatDialogRef<EditCategoryDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private data: [string, string, OpenType],
    private dialog: MatDialog
  ) {
  }

  ngOnInit(): void {
    this.categoryTitle = this.data[0];
    this.dialogTitle = this.data[1];
    this.openType = this.data[2];
  }

  onConfirm() {
    this.dialogRef.close(this.categoryTitle);
  }

  onCancel() {
    this.dialogRef.close(false);
  }

  onDelete() {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: '440px',
      data: {
        dialogTitle: 'Подтвердите действие',
        message: `Вы действительно хотите удалить категорию: "${this.categoryTitle}"? (сами задачи не удаляются)`
      },
      autoFocus: false
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.dialogRef.close('delete');
      }
    });
  }

  canDelete(): boolean{
    return this.openType === OpenType.EDIT;
  }
}
