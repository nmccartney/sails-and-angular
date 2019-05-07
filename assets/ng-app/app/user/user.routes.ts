import { Routes } from "@angular/router";
import { ViewComponent } from "./view/view.component";
import { GuardService } from "../auth/guard.service";

export const userRoutes: Routes = [
  {
    path: 'user',
    component: ViewComponent,
    canActivate: [GuardService],
    // children:[
    //   {
    //     path:'',
    //     component: ViewComponent
    //   }
    // ]
  },
  // lazy load
  // {
  //   path: 'customers',
  //   loadChildren: './customers/customers.module#CustomersModule'
  // },
]
