import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule, MatButtonModule, MatToolbarModule, MatDialogModule, MatListModule, MatIconModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { GroupViewComponent } from './group-view/group-view.component';
import { GroupListComponent } from './group-list/group-list.component';

@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule,
    MatTableModule,
    MatButtonModule,
    MatToolbarModule,
    MatDialogModule,
    MatIconModule,
    MatListModule,
  ],
  exports:[
    GroupViewComponent,
    GroupListComponent
  ],
  declarations: [GroupViewComponent, GroupListComponent],
})
export class GroupModule { }
