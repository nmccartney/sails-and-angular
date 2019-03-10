import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewComponent } from './view/view.component';
import { RouterModule } from '@angular/router';
import { userRoutes } from './user.routes';
import { MatTabsModule, MatTableModule, MatButtonModule, MatCardModule, MatToolbarModule, MatFormFieldModule } from '@angular/material';
import { GroupModule } from '../group/group.module';
import { UserManagerComponent } from './user-manager/user-manager.component';
import { EventModule } from '../event/event.module';
import { MatDatetimepickerModule } from '@mat-datetimepicker/core';
import { MatMomentDatetimeModule } from '@mat-datetimepicker/moment';


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(userRoutes),
    MatButtonModule,
    MatTabsModule,
    MatCardModule,
    MatFormFieldModule,
    MatMomentDatetimeModule,
    MatDatetimepickerModule,
    MatToolbarModule,
    MatTableModule,
    GroupModule,
    EventModule,
  ],
  declarations: [ViewComponent, UserManagerComponent]
})
export class UserModule { }
