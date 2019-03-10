import { Component, OnInit } from '@angular/core';
import { DateAdapter } from 'angular-calendar';
import { MomentDatetimeAdapter, MAT_MOMENT_DATETIME_FORMATS } from '@mat-datetimepicker/moment';
import { MAT_DATE_LOCALE } from '@angular/material';
import { MAT_DATETIME_FORMATS } from '@mat-datetimepicker/core';

@Component({
  selector: 'app-event-view',
  templateUrl: './event-view.component.html',
  styleUrls: ['./event-view.component.scss'],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDatetimeAdapter,
      deps: [MAT_DATE_LOCALE]
    },
    {
      provide: MAT_DATETIME_FORMATS,
      useValue: MAT_MOMENT_DATETIME_FORMATS
    }
  ],
})
export class EventViewComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
