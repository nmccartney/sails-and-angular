import { Routes } from "@angular/router";
import { GuardService } from "../auth/guard.service";
import { ChatViewComponent } from "./chat-view/chat-view.component";

export const messageRoutes: Routes = [
  {
    path: 'messages',
    component: ChatViewComponent,
    canActivate: [GuardService]
  },
  {
    path: 'messages/:group_uid',
    component: ChatViewComponent,
    canActivate: [GuardService]
  },
  // lazy load
  // {
  //   path: 'customers',
  //   loadChildren: './customers/customers.module#CustomersModule'
  // },
]
