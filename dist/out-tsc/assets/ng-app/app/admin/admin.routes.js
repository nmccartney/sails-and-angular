import { GuardService } from "../auth/guard.service";
import { AdminViewComponent } from "./admin-view/admin-view.component";
export var adminRoutes = [
    { path: 'admin', component: AdminViewComponent, canActivate: [GuardService] }
];
//# sourceMappingURL=admin.routes.js.map