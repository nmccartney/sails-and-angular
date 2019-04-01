import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateDialogComponent } from './create-dialog/create-dialog.component';
import { GroupManagerComponent } from './group-manager.component';
import { MatFormFieldModule, MatToolbarModule, MatTableModule, MatButtonModule, MatInputModule, MatDialogModule, MatChipsModule, MatIconModule, MatAutocompleteModule, MatSnackBarModule, MatTabsModule, MatListModule } from '@angular/material';
import { EditDialogComponent } from './edit-dialog/edit-dialog.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { EventManagerModule } from '../event-manager/event-manager.module';
import { GroupiesViewComponent } from './groupies-view/groupies-view.component';
import { AgmCoreModule } from '@agm/core';
import { EditChatComponent } from './edit-dialog/edit-chat/edit-chat.component';

@NgModule({
  imports: [
    CommonModule,
    EventManagerModule,
    FlexLayoutModule,
    MatButtonModule,
    MatFormFieldModule,
    MatListModule,
    MatToolbarModule,
    MatTableModule,
    MatTabsModule,
    MatInputModule,
    MatDialogModule,
    MatChipsModule,
    MatIconModule,
    MatAutocompleteModule,
    MatSnackBarModule,
    ReactiveFormsModule,
    AgmCoreModule,
  ],
  exports:[
    GroupManagerComponent
  ],
  declarations: [
    GroupManagerComponent,
    CreateDialogComponent,
    EditDialogComponent,
    GroupiesViewComponent,
    EditChatComponent
  ],
  entryComponents:[
    CreateDialogComponent,
    EditDialogComponent
  ]
})
export class GroupManagerModule { }
