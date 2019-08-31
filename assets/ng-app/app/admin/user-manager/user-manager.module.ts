import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserManagerComponent } from './user-manager.component';
import { MatTableModule, MatButtonModule, MatIconModule, MatSnackBarModule, MatDialogModule, MatSortModule, MatPaginatorModule, MatFormFieldModule, MatInputModule } from '@angular/material';
import { UserEditDialogComponent } from './user-edit-dialog/user-edit-dialog.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatSortModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatSnackBarModule,
  ],
  declarations: [
    UserManagerComponent,
    UserEditDialogComponent
  ],
  exports:[
    UserManagerComponent
  ],
  entryComponents:[
    UserEditDialogComponent
  ]
})
export class UserManagerModule { }
