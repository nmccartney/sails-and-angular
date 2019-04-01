var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormField, MatFormFieldModule, MatInputModule, MatButtonModule, MatTabsModule } from '@angular/material';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { JwtInterceptor } from '../_helpers/jwt.interceptor';
import { ErrorInterceptor } from '../_helpers/error.interceptor';
import { GuardService } from './guard.service';
import { LoginDialogComponent } from './login-dialog/login-dialog.component';
var AuthModule = /** @class */ (function () {
    function AuthModule() {
    }
    AuthModule = __decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                MatButtonModule,
                MatFormFieldModule,
                MatInputModule,
                MatTabsModule,
                HttpClientModule,
                ReactiveFormsModule,
            ],
            exports: [
                LoginComponent,
                RegisterComponent,
                LoginDialogComponent
            ],
            declarations: [
                LoginComponent,
                RegisterComponent,
                LoginDialogComponent
            ],
            entryComponents: [
                MatFormField
            ],
            providers: [
                GuardService,
                { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
                { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
            ],
        })
    ], AuthModule);
    return AuthModule;
}());
export { AuthModule };
//# sourceMappingURL=auth.module.js.map