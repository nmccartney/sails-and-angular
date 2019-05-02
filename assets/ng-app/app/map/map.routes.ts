import { Routes } from "@angular/router";
import { MapViewComponent } from "./map-view/map-view.component";
import { GuardService } from "../auth/guard.service";

export const mapRoutes: Routes = [
  {
    path: 'map/:group_uid',
    component: MapViewComponent,
    canActivate: [GuardService]
  },
  {
    path: 'map',
    component: MapViewComponent,
    canActivate: [GuardService]
  },
  // lazy load
  // {
  //   path: 'customers',
  //   loadChildren: './customers/customers.module#CustomersModule'
  // },
]
