import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventViewComponent } from './event-view/event-view.component';
import { MatButtonModule, MatTableModule, MatCardModule, MatDialogModule, MatToolbarModule, MatSnackBarModule, MatFormField, MatFormFieldModule, MatAutocompleteModule, MatChipList, MatChipsModule, MatIconModule, MatInputModule, MatDatepickerModule, MatSortModule } from '@angular/material';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AgmCoreModule } from '@agm/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { FlatpickrModule } from 'angularx-flatpickr';
import { MatDatetimepickerModule, MAT_DATETIME_FORMATS, } from '@mat-datetimepicker/core';
import { MatMomentDatetimeModule } from '@mat-datetimepicker/moment';
import { EventCalendarComponent } from './event-calendar/event-calendar.component';
import { eventRoutes } from './event.routes';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    AgmCoreModule,
    CommonModule,
    FlexLayoutModule,
    MatButtonModule,
    MatFormFieldModule,
    MatAutocompleteModule,
    MatDatepickerModule,
    MatChipsModule,
    MatSortModule,
    MatTableModule,
    MatInputModule,
    MatIconModule,
    MatCardModule,
    MatDialogModule,
    MatToolbarModule,
    MatSnackBarModule,
    ReactiveFormsModule,
    FormsModule,
    MatMomentDatetimeModule,
    MatDatetimepickerModule,
    FlatpickrModule.forRoot(),
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory
    }),
    RouterModule.forRoot(eventRoutes),
  ],
  exports: [
    EventViewComponent
  ],
  declarations: [
    EventViewComponent,
    EventCalendarComponent,
  ],
  entryComponents: [
    EventCalendarComponent,
  ],

})
export class EventModule { }
