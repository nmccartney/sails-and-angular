import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventManagerComponent } from './event-manager/event-manager.component';
import { EventViewComponent } from './event-view/event-view.component';
import { MatButtonModule, MatTableModule, MatCardModule, MatDialogModule, MatToolbarModule, MatSnackBarModule, MatFormField, MatFormFieldModule, MatAutocompleteModule, MatChipList, MatChipsModule, MatIconModule, MatInputModule } from '@angular/material';
import { CreateDialogComponent } from './event-manager/create-dialog/create-dialog.component';
import { EditDialogComponent } from './event-manager/edit-dialog/edit-dialog.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    MatFormFieldModule,
    MatAutocompleteModule,
    MatChipsModule,
    MatTableModule,
    MatInputModule,
    MatIconModule,
    MatCardModule,
    MatDialogModule,
    MatToolbarModule,
    MatSnackBarModule,
    ReactiveFormsModule

  ],
  exports:[
    EventManagerComponent,
    EventViewComponent
  ],
  declarations: [
    EventManagerComponent,
    EventViewComponent,
    CreateDialogComponent,
    EditDialogComponent
  ],
  entryComponents: [
    CreateDialogComponent,
    EditDialogComponent
  ]
})
export class EventModule { }
