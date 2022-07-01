import {Component, OnInit} from '@angular/core';
import {AboutDialogComponent} from "../../dialog/about/about-dialog.component";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})

// "presentational component": отображает полученные данные
// подвал - нижняя часть страницы
export class FooterComponent implements OnInit {
  year: Date;
  site = 'https://www.google.com/';
  blog = 'https://www.google.com/';
  siteName = 'Enimatters Site';

  constructor(private dialog: MatDialog) {
  }

  ngOnInit() {
    this.year = new Date(); // текуший год
  }

  // окно "О программе"
  openAboutDialog() {
    this.dialog.open(AboutDialogComponent,
      {
        autoFocus: false,
        data: {
          dialogTitle: 'О программе',
          message: 'Данное приложение было создано для для практики Angular'
        },
        width: '400px'
      });
  }
}
