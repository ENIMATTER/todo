import {Component, OnInit} from '@angular/core';
import {AboutDialogComponent} from "../../dialog/about/about-dialog.component";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})

export class FooterComponent implements OnInit {
  year: Date;
  siteName = 'AEFAM Site';

  constructor(private dialog: MatDialog) {
  }

  ngOnInit() {
    this.year = new Date();
  }

  openAboutDialog() {
    this.dialog.open(AboutDialogComponent,
      {
        autoFocus: false,
        data: {
          dialogTitle: 'О программе',
          message: 'Данное приложение было создано для практики Java/Spring + Angular. Отдельная благодарность моей будущей жене Анастасии, за поддержку и искреннюю любовь❤'
        },
        width: '400px'
      });
  }
}
