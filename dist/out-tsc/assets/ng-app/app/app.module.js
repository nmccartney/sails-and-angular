var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SailsClientModule } from 'ngx-sails';
import { AppComponent } from './app.component';
import { MaterialModule } from './material.module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtInterceptor } from './_helpers/jwt.interceptor';
import { ErrorInterceptor } from './_helpers/error.interceptor';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { RouterModule } from '@angular/router';
import { HomeModule } from './home/home.module';
import { HomeViewComponent } from './home/home-view/home-view.component';
import { JwtModule } from '@auth0/angular-jwt';
import { HeaderModule } from './header/header.module';
import { AgmCoreModule } from '@agm/core';
import { AdminModule } from './admin/admin.module';
import { MatMomentDatetimeModule } from '@mat-datetimepicker/moment';
var socketConfig = { uri: 'http://localhost:1337' };
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        NgModule({
            declarations: [
                AppComponent
            ],
            imports: [
                AdminModule,
                AuthModule,
                AgmCoreModule.forRoot({
                    apiKey: 'AIzaSyCQ1pGRsiGLQP2rJavFC-jKVh0uaHf1uws',
                    libraries: ["places"]
                }),
                BrowserAnimationsModule,
                BrowserModule,
                MaterialModule,
                MatMomentDatetimeModule,
                FlexLayoutModule.withConfig({
                // useColumnBasisZero: false,
                // printWithBreakpoints: ['md', 'lt-lg', 'lt-xl', 'gt-sm', 'gt-xs']
                }),
                FormsModule,
                // HttpClientModule,
                ReactiveFormsModule,
                JwtModule.forRoot({
                    config: {
                        tokenGetter: function () {
                            return localStorage.getItem('token');
                        },
                    }
                }),
                SailsClientModule.configureClient(socketConfig),
                //application specific
                HomeModule,
                HeaderModule,
                // Remark: because you havent defined any routes, I have to pass an empty
                // route collection to forRoot, as the first parameter is mandatory.
                RouterModule.forRoot([
                    { path: '', component: HomeViewComponent }
                ]),
                UserModule,
            ],
            providers: [
                { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
                { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
            ],
            bootstrap: [AppComponent]
        })
    ], AppModule);
    return AppModule;
}());
export { AppModule };
//# sourceMappingURL=app.module.js.map