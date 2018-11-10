import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewComponent } from './view/view.component';
import { RouterModule } from '@angular/router';
import { userRoutes } from './user.routes';
import { MatTabsModule } from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(userRoutes),
    MatTabsModule
  ],
  declarations: [ViewComponent]
})
export class UserModule { }
