import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewComponent } from './view/view.component';
import { RouterModule } from '@angular/router';
import { userRoutes } from './user.routes';
import { MatTabsModule, MatTableModule, MatButtonModule } from '@angular/material';
import { GroupModule } from '../group/group.module';


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(userRoutes),
    MatButtonModule,
    MatTabsModule,
    MatTableModule,
    GroupModule
  ],
  declarations: [ViewComponent]
})
export class UserModule { }
