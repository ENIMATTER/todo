import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {SettingsDialogComponent} from "../../dialog/settings-dialog/settings-dialog.component";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit {

  @Input()
  categoryName: string;

  @Input()
  showStat:boolean;

  @Output()
  toggleStat = new EventEmitter<boolean>();

  constructor(
    private dialog: MatDialog
  ) {
  }

  ngOnInit() {
  }

  onToggleStat(){
    this.toggleStat.emit(!this.showStat);
  }

  showSettings(){
    const dialogRef = this.dialog.open(SettingsDialogComponent, {
      autoFocus: false,
      width: '500px'
    });
  }



}
