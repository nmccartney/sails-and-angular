import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule, MatButtonModule, MatToolbarModule, MatDialogModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { GroupViewComponent } from './group-view/group-view.component';

@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule,
    MatTableModule,
    MatButtonModule,
    MatToolbarModule,
    MatDialogModule,
  ],
  exports:[
    GroupViewComponent
  ],
  declarations: [GroupViewComponent],
})
export class GroupModule { }
