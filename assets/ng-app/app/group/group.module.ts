import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule, MatButtonModule, MatToolbarModule, MatDialogModule, MatListModule, MatIconModule, MatTabsModule, MatFormFieldModule, MatChipsModule, MatInputModule, MatAutocompleteModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { GroupViewComponent } from './group-view/group-view.component';
import { GroupListComponent } from './group-list/group-list.component';
import { RouterModule } from '@angular/router';
import { groupRoutes } from './group.routes';
import { GroupNewComponent } from './group-new/group-new.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    RouterModule.forRoot(groupRoutes),
    CommonModule,
    FlexLayoutModule,
    MatTableModule,
    MatTabsModule,
    MatButtonModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatChipsModule,
    MatInputModule,
    MatAutocompleteModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatIconModule,
    MatListModule,
  ],
  exports:[
    GroupViewComponent,
    GroupListComponent
  ],
  declarations: [GroupViewComponent, GroupListComponent, GroupNewComponent],
})
export class GroupModule { }
