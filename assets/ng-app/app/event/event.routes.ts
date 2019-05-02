import { Routes } from "@angular/router";
import { GuardService } from "../auth/guard.service";
import { EventViewComponent } from "./event-view/event-view.component";

export const eventRoutes: Routes = [
  {
    path: 'events',
    component: EventViewComponent,
    canActivate: [GuardService]
  },
  {
    path: 'events/:group_uid',
    component: EventViewComponent,
    canActivate: [GuardService]
  },
  // lazy load
  // {
  //   path: 'customers',
  //   loadChildren: './customers/customers.module#CustomersModule'
  // },
]
