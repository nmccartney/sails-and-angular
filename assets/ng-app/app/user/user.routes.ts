import { Routes } from "@angular/router";
import { ViewComponent } from "./view/view.component";
import { GuardService } from "../auth/guard.service";

export const userRoutes: Routes = [
  {
    path: 'user',
    component: ViewComponent,
    canActivate: [GuardService]
  },
  // lazy load
  // {
  //   path: 'customers',
  //   loadChildren: './customers/customers.module#CustomersModule'
  // },
]
