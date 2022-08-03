import {Component, Input, OnInit} from '@angular/core';
import {DashboardData} from "../../object/DashboardData";

@Component({
  selector: 'app-stat',
  templateUrl: './stat.component.html',
  styleUrls: ['./stat.component.css']
})

export class StatComponent implements OnInit {

  @Input()
  dash: DashboardData;

  @Input()
  showStat:boolean;

  constructor() {}

  ngOnInit() {}

  // @ts-ignore
  getTotal(): number {
    if (this.dash) {
      return this.dash.completedTotal + this.dash.uncompletedTotal
    }
  }

  // @ts-ignore
  getCompletedCount() {
    if (this.dash) {
      return this.dash.completedTotal;
    }
  }

  // @ts-ignore
  getUncompletedCount() {
    if (this.dash) {
      return this.dash.uncompletedTotal;
    }
  }

  // @ts-ignore
  getCompletedPercent() {
    if (this.dash) {
      return this.dash.completedTotal ? (this.dash.completedTotal / this.getTotal()) : 0;
    }
  }

  // @ts-ignore
  getUncompletedPercent() {
    if (this.dash) {
      return this.dash.uncompletedTotal ? (this.dash.uncompletedTotal / this.getTotal()) : 0;
    }
  }

}
