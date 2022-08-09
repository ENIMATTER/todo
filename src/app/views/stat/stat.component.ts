import {Component, Input, OnInit} from '@angular/core';
import {DashboardData} from '../../object/DashboardData';
import {DeviceDetectorService} from "ngx-device-detector";

@Component({
  selector: 'app-stat',
  templateUrl: './stat.component.html',
  styleUrls: ['./stat.component.css']
})

export class StatComponent implements OnInit {

  @Input()
  dash: DashboardData;

  @Input()
  showStat: boolean;

  isMobile: boolean;
  isTablet: boolean;

  constructor(private deviceService: DeviceDetectorService) {
    this.isMobile = deviceService.isMobile();
    this.isTablet = deviceService.isTablet();
  }

  ngOnInit() {
  }

  getTotal(): number {
    if (this.dash) {
      return this.dash.completedTotal + this.dash.uncompletedTotal;
    } else{
      return 0;
    }
  }

  getCompletedCount(): number {
    if (this.dash) {
      return this.dash.completedTotal;
    }else{
      return 0;
    }
  }

  getUncompletedCount(): number {
    if (this.dash) {
      return this.dash.uncompletedTotal;
    }else{
      return 0;
    }
  }

  getCompletedPercent(): number {
    if (this.dash) {
      return this.dash.completedTotal ? (this.dash.completedTotal / this.getTotal()) : 0;
    }else{
      return 0;
    }
  }

  getUncompletedPercent(): number {
    if (this.dash) {
      return this.dash.uncompletedTotal ? (this.dash.uncompletedTotal / this.getTotal()) : 0;
    }else{
      return 0;
    }
  }

}
