import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateDialogComponent } from './create-dialog/create-dialog.component';
import { EditDialogComponent } from './edit-dialog/edit-dialog.component';
import { MatFormFieldModule, MatToolbarModule, MatTableModule, MatButtonModule, MatInputModule, MatDialogModule, MatChipsModule, MatIconModule, MatAutocompleteModule, MatSnackBarModule } from '@angular/material';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    MatFormFieldModule,
    MatToolbarModule,
    MatTableModule,
    MatInputModule,
    MatDialogModule,
    MatChipsModule,
    MatIconModule,
    MatAutocompleteModule,
    MatSnackBarModule,
    ReactiveFormsModule
  ],
  declarations: [
    CreateDialogComponent,
    EditDialogComponent
  ]
})
export class EventManagerModule { }
