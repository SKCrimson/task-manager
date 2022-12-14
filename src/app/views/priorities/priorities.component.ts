import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Priority} from "../../model/Priority";
import {MatDialog} from "@angular/material/dialog";
import {OpenType} from "../../dialog/OpenType";
import {EditPriorityDialogComponent} from "../../dialog/edit-priority-dialog/edit-priority-dialog.component";
import {ConfirmDialogComponent} from "../../dialog/confirm-dialog/confirm-dialog.component";

@Component({
  selector: 'app-priorities',
  templateUrl: './priorities.component.html',
  styleUrls: ['./priorities.component.css']
})
export class PrioritiesComponent implements OnInit {

  static defaultColor = '#fff';

  @Input()
  priorities!: Priority[];

  // удалили
  @Output()
  deletePriority = new EventEmitter<Priority>();

  // изменили
  @Output()
  updatePriority = new EventEmitter<Priority>();

  // добавили
  @Output()
  addPriority = new EventEmitter<Priority>();

  constructor(private dialog: MatDialog) {
  }

  ngOnInit(): void {
  }

  onAddPriority() {
    const dialogRef = this.dialog.open(EditPriorityDialogComponent, {
      data: ['', 'Добавление приоритета', OpenType.ADD],
      minWidth: '500px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const newPriority = new Priority(0, result as string, PrioritiesComponent.defaultColor);
        this.addPriority.emit(newPriority);
      }
    });
  }

  onEditPriority(priority: Priority) {
    const dialogRef = this.dialog.open(EditPriorityDialogComponent,
      {data: [priority.title, 'Редактирование приоритета', OpenType.EDIT],
      minWidth: '500px'});

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'delete') {
        this.deletePriority.emit(priority);
        return;
      }

      if (result) {
        priority.title = result as string;
        this.updatePriority.emit(priority);
        return;
      }
    });
  }

  onDeletePriority(priority: Priority) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: '440px',
      data: {
        dialogTitle: 'Подтвердите действие',
        message: `Вы действительно хотите удалить категорию: "${priority.title}"? (задачам проставится значение 'Без приоритета')`
      },
      autoFocus: false
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deletePriority.emit(priority);
      }
    });
  }
}
