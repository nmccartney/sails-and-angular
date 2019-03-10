import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateDialogComponent } from './create-dialog/create-dialog.component';
import { GroupManagerComponent } from './manager.component';
import { MatFormFieldModule, MatToolbarModule, MatTableModule, MatButtonModule, MatInputModule, MatDialogModule, MatChipsModule, MatIconModule, MatAutocompleteModule, MatSnackBarModule, MatTabsModule } from '@angular/material';
import { EditDialogComponent } from './edit-dialog/edit-dialog.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule,
    MatButtonModule,
    MatFormFieldModule,
    MatToolbarModule,
    MatTableModule,
    MatTabsModule,
    MatInputModule,
    MatDialogModule,
    MatChipsModule,
    MatIconModule,
    MatAutocompleteModule,
    MatSnackBarModule,
    ReactiveFormsModule
  ],
  exports:[
    GroupManagerComponent
  ],
  declarations: [
    GroupManagerComponent,
    CreateDialogComponent,
    EditDialogComponent
  ],
  entryComponents:[
    CreateDialogComponent,
    EditDialogComponent
  ]
})
export class ManagerModule { }
