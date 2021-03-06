import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateDialogComponent } from './create-dialog/create-dialog.component';
import { EditDialogComponent } from './edit-dialog/edit-dialog.component';
import {
  MatFormFieldModule,
  MatToolbarModule,
  MatTableModule,
  MatButtonModule,
  MatInputModule,
  MatDialogModule,
  MatChipsModule,
  MatIconModule,
  MatAutocompleteModule,
  MatSnackBarModule,
  MatDatepickerModule,
  MatSortModule,
  DateAdapter,
  MAT_DATE_LOCALE,
  MatButtonToggleModule
} from '@angular/material';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { EventCalendarComponent } from './edit-dialog/event-calendar/event-calendar.component';
import { MatDatetimepickerModule, MAT_DATETIME_FORMATS } from '@mat-datetimepicker/core';
import { AgmCoreModule } from '@agm/core';
import { CalendarModule } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { EventManagerComponent } from './event-manager.component';
import { MatMomentDatetimeModule, MAT_MOMENT_DATETIME_FORMATS, MomentDatetimeAdapter } from '@mat-datetimepicker/moment';

@NgModule({
  imports: [
    AgmCoreModule,
    CommonModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: MomentDatetimeAdapter
    }),
    FlexLayoutModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatFormFieldModule,
    MatToolbarModule,
    MatTableModule,
    MatInputModule,
    MatIconModule,
    MatDialogModule,
    MatChipsModule,
    MatIconModule,
    MatSortModule,
    MatDatetimepickerModule,
    MatDatepickerModule,
    MatAutocompleteModule,
    MatSnackBarModule,
    ReactiveFormsModule,
    FormsModule
  ],
  declarations: [
    CreateDialogComponent,
    EditDialogComponent,
    EventCalendarComponent,
    EventManagerComponent
  ],
  exports: [
    EventCalendarComponent,
    EventManagerComponent,
    CreateDialogComponent,
  ],
  entryComponents: [
    EditDialogComponent,
    CreateDialogComponent
  ],
})
export class EventManagerModule { }
