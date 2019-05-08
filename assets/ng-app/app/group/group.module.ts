import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule, MatButtonModule, MatToolbarModule, MatDialogModule, MatListModule, MatIconModule, MatTabsModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { GroupViewComponent } from './group-view/group-view.component';
import { GroupListComponent } from './group-list/group-list.component';
import { RouterModule } from '@angular/router';
import { groupRoutes } from './group.routes';

@NgModule({
  imports: [
    RouterModule.forRoot(groupRoutes),
    CommonModule,
    FlexLayoutModule,
    MatTableModule,
    MatTabsModule,
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
