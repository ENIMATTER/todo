import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {SettingsDialogComponent} from "../../dialog/settings-dialog/settings-dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {IntroService} from "../../service/intro.service";
import {DeviceDetectorService} from "ngx-device-detector";
import {DialogAction} from "../../object/DialogResult";
import {Priority} from "../../model/Priority";

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

  @Output()
  toggleMenu = new EventEmitter();

  @Output()
  settingsChanged = new EventEmitter<Priority[]>();

  isMobile: boolean;
  isTablet: boolean;

  constructor(
    private dialog: MatDialog,
    private introService: IntroService,
    private deviceService: DeviceDetectorService
  ) {
    this.isMobile = deviceService.isMobile();
    this.isTablet = this.deviceService.isTablet();
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

    dialogRef.afterClosed().subscribe(result => {
      if(result && result.action === DialogAction.SETTINGS_CHANGE){
        this.settingsChanged.emit(result.obj);
        return;
      }
    })
  }

  showIntroHelp(){
    this.introService.startIntroJS(false);
  }

  onToggleMenu(){
    this.toggleMenu.emit();
  }

}
