import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule, MatButtonModule, MatToolbarModule, MatDialogModule } from '@angular/material';
import { ManagerModule } from './manager/manager.module';
import { GroupManagerComponent } from './manager/manager.component';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule,
    MatTableModule,
    MatButtonModule,
    MatToolbarModule,
    MatDialogModule,
    ManagerModule
  ],
  exports:[GroupManagerComponent]
})
export class GroupModule { }
