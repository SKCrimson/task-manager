import {Component, OnInit} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {AboutDialogComponent} from "../../dialog/about-dialog/about-dialog.component";

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  site = 'https://javabegin.ru/';
  blog = 'https://javabegin.ru/blog/tag/angular/';
  siteName = 'JavaBegin';
  year!: Date;

  constructor(private dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.year = new Date();
  }

  openAboutDialog() {
    this.dialog.open(AboutDialogComponent,
      {
        autoFocus: false,
        data: {
          dialogTitle: 'О программе',
          message: 'Данное приложение было создано для видеокурса "Angular для начинающих" на сайте javabegin.ru'
        },
        width: '400px'
      });
  }
}
