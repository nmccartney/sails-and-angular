var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewComponent } from './view/view.component';
import { RouterModule } from '@angular/router';
import { userRoutes } from './user.routes';
import { MatTabsModule, MatTableModule, MatButtonModule, MatCardModule, MatToolbarModule } from '@angular/material';
import { GroupModule } from '../group/group.module';
import { UserManagerComponent } from './user-manager/user-manager.component';
import { EventModule } from '../event/event.module';
var UserModule = /** @class */ (function () {
    function UserModule() {
    }
    UserModule = __decorate([
        NgModule({
            imports: [
                CommonModule,
                RouterModule.forRoot(userRoutes),
                MatButtonModule,
                MatTabsModule,
                MatCardModule,
                MatToolbarModule,
                MatTableModule,
                GroupModule,
                EventModule,
            ],
            declarations: [ViewComponent, UserManagerComponent]
        })
    ], UserModule);
    return UserModule;
}());
export { UserModule };
//# sourceMappingURL=user.module.js.map