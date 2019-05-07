import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewComponent } from './view/view.component';
import { RouterModule } from '@angular/router';
import { userRoutes } from './user.routes';
import { MatTabsModule, MatTableModule, MatButtonModule, MatCardModule, MatToolbarModule, MatListModule, MatIconModule, MatGridListModule } from '@angular/material';
import { GroupModule } from '../group/group.module';
import { UserManagerComponent } from './user-manager/user-manager.component';
import { EventModule } from '../event/event.module';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { MapModule } from '../map/map.module';
import { MessageModule } from '../message/message.module';
import { UserListComponent } from './user-list/user-list.component';


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(userRoutes),
    MatButtonModule,
    MatTabsModule,
    MatCardModule,
    MatToolbarModule,
    MatTableModule,
    MatIconModule,
    MatListModule,
    MatGridListModule,
    MapModule,
    GroupModule,
    EventModule,
    MessageModule,
  ],
  exports:[
    UserListComponent
  ],
  declarations: [ViewComponent, UserManagerComponent, UserProfileComponent, UserListComponent]
})
export class UserModule { }
