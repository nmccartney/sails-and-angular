import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SailsClientModule, ISailsClientConfig } from 'ngx-sails';

import { AppComponent } from './app.component';
import { MaterialModule } from './material.module';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
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
import { GroupModule } from './group/group.module';
import { MapModule } from './map/map.module';

const socketConfig: ISailsClientConfig = { uri: 'http://localhost:1337' };

export function getLocalToken():any {
  return localStorage.getItem('token');
}

@NgModule({
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
        tokenGetter: getLocalToken(),
        // whitelistedDomains: ['localhost:3000'],
        // blacklistedRoutes: ['localhost:3001/auth/']
      }
    }),
    SailsClientModule.configureClient(socketConfig),
    //application specific
    HomeModule,
    HeaderModule,
    GroupModule,
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
export class AppModule { }
