import { Routes } from "@angular/router";
import { GuardService } from "../auth/guard.service";
import { AdminViewComponent } from "./admin-view/admin-view.component";

export const adminRoutes: Routes = [
  { path: 'admin', component: AdminViewComponent, canActivate: [GuardService] }
]
