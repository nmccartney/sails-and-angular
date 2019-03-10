import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserManagerComponent } from './user-manager.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [UserManagerComponent],
  exports:[
    UserManagerComponent
  ]
})
export class UserManagerModule { }
