import {Component, Input, OnInit} from '@angular/core';
import Chart from 'chart.js';
import {ApiCalls} from '../../shared/api-calls/apiCalls';
import {ActivatedRoute} from '@angular/router';
import {AVG_TYPES} from '../../../assets/data/avg_types';
import {NgxSpinnerService} from 'ngx-spinner';

declare var google: any;


@Component({
  selector: 'average-cmp',
  moduleId: module.id,
  templateUrl: 'alertHistory.component.html'
})

export class AlertHistoryComponent implements OnInit {
  history = [];
  alertsHistory;
  constructor(public apiCall: ApiCalls, private route: ActivatedRoute, private spinner: NgxSpinnerService) {
  }

  ngOnInit() {
    this.spinner.show();
    this.apiCall.getLastWeekAlerts().subscribe((response: any) => {
      this.alertsHistory = response.body
      this.alertsHistory.forEach(alert => {
        if (alert.co_level_alert) {
          this.history.push({
            time: alert.time,
            co_level_alert: alert.co_level_alert,
            co_level: alert.co_level,
            device_name : alert.device_name
          })
        }
        if (alert.audio_alert) {
          this.history.push({
            time: alert.time,
            audio_alert: alert.audio_alert,
            audio_level: alert.audio_level,
            device_name : alert.device_name
          })
        }
      })
      this.spinner.hide();
    })
  }
}

