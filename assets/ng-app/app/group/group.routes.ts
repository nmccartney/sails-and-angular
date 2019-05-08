import { Routes } from "@angular/router";
import { GuardService } from "../auth/guard.service";
import { GroupViewComponent } from "./group-view/group-view.component";
import { MapViewComponent } from "../map/map-view/map-view.component";
import { EventViewComponent } from "../event/event-view/event-view.component";
import { ChatViewComponent } from "../message/chat-view/chat-view.component";

export const groupRoutes: Routes = [
  {
    path: 'group/:uid',
    component: GroupViewComponent,
    canActivate: [GuardService],
    children: [
      {
        path: '',
        redirectTo: 'map',
        pathMatch: 'full'
      },
      {
        path: 'map',
        component: MapViewComponent
      },
      {
        path: 'events',
        component: EventViewComponent
      },
      {
        path: 'messages',
        component: ChatViewComponent
      },
    ]
  },
  // lazy load
  // {
  //   path: 'customers',
  //   loadChildren: './customers/customers.module#CustomersModule'
  // },
]
