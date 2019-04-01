import { ViewComponent } from "./view/view.component";
import { GuardService } from "../auth/guard.service";
export var userRoutes = [
    { path: 'user', component: ViewComponent, canActivate: [GuardService] }
];
//# sourceMappingURL=user.routes.js.map