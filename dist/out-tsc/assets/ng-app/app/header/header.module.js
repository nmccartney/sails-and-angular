var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header.component';
import { MatToolbarModule, MatDialogModule, MatTabsModule, MatButtonModule } from '@angular/material';
import { AuthModule } from '../auth/auth.module';
import { LoginDialogComponent } from '../auth/login-dialog/login-dialog.component';
var HeaderModule = /** @class */ (function () {
    function HeaderModule() {
    }
    HeaderModule = __decorate([
        NgModule({
            imports: [
                CommonModule,
                MatButtonModule,
                MatToolbarModule,
                MatDialogModule,
                MatTabsModule,
                AuthModule
            ],
            exports: [
                HeaderComponent,
            ],
            declarations: [HeaderComponent],
            entryComponents: [
                LoginDialogComponent
            ]
        })
    ], HeaderModule);
    return HeaderModule;
}());
export { HeaderModule };
//# sourceMappingURL=header.module.js.map