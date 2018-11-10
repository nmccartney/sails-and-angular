import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  MatFormField,
  MatFormFieldModule,
  MatInputModule, MatButtonModule, MatTabsModule
} from '@angular/material';
import { RouterModule } from '@angular/router';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { JwtInterceptor } from '../_helpers/jwt.interceptor';
import { ErrorInterceptor } from '../_helpers/error.interceptor';
import { GuardService } from './guard.service';
import { LoginDialogComponent } from './login-dialog/login-dialog.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatTabsModule,
    HttpClientModule,
    ReactiveFormsModule,
    // Remark: because you havent defined any routes, I have to pass an empty
    // route collection to forRoot, as the first parameter is mandatory.
    // RouterModule.forRoot([]),
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
export class AuthModule { }
