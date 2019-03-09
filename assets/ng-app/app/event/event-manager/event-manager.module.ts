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
  MatSortModule
} from '@angular/material';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { EventCalendarComponent } from './edit-dialog/event-calendar/event-calendar.component';

@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule,
    MatButtonModule,
    MatFormFieldModule,
    MatToolbarModule,
    MatTableModule,
    MatInputModule,
    MatIconModule,
    MatDialogModule,
    MatChipsModule,
    MatIconModule,
    MatSortModule,
    MatDatepickerModule,
    MatAutocompleteModule,
    MatSnackBarModule,
    ReactiveFormsModule,
    FormsModule
  ],
  declarations: [
    CreateDialogComponent,
    EditDialogComponent,
    EventCalendarComponent
  ]
})
export class EventManagerModule { }
