import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminViewComponent } from './admin-view/admin-view.component';
import { RouterModule } from '@angular/router';
import { adminRoutes } from './admin.routes';
import {
  MatTableModule,
  MatToolbarModule,
  MatCardModule,
  MatTabsModule,
  MatButtonModule,
  MAT_DATE_LOCALE
} from '@angular/material';
import { EventManagerModule } from './event-manager/event-manager.module';
import { AgmCoreModule } from '@agm/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatMomentDatetimeModule, MomentDatetimeAdapter, MAT_MOMENT_DATETIME_FORMATS } from '@mat-datetimepicker/moment';
import { MatDatetimepickerModule, MAT_DATETIME_FORMATS } from '@mat-datetimepicker/core';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { DateAdapter, CalendarModule } from 'angular-calendar';
import { FlatpickrModule } from 'angularx-flatpickr';
import { EventManagerComponent } from './event-manager/event-manager.component';

@NgModule({
  imports: [
    AgmCoreModule,
    CommonModule,
    EventManagerModule,
    MatButtonModule,
    MatTabsModule,
    MatCardModule,
    MatToolbarModule,
    MatTableModule,
    ReactiveFormsModule,
    FormsModule,
    // MatMomentDatetimeModule,
    MatDatetimepickerModule,
    FlatpickrModule.forRoot(),
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory
    }),
    RouterModule.forRoot(adminRoutes),
  ],
  exports:[
  ],
  declarations: [
    AdminViewComponent,
  ],
  // providers: [
  //   {
  //     provide: DateAdapter,
  //     useClass: MomentDatetimeAdapter,
  //     deps: [MAT_DATE_LOCALE]
  //   },
  //   {
  //     provide: MAT_DATETIME_FORMATS,
  //     useValue: MAT_MOMENT_DATETIME_FORMATS
  //   }
  // ],
})
export class AdminModule { }
