import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header.component';
import { MatToolbarModule, MatDialogModule, MatTabsModule, MatButtonModule } from '@angular/material';
import { AuthModule } from '../auth/auth.module';
import { LoginDialogComponent } from '../auth/login-dialog/login-dialog.component';

@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    MatToolbarModule,
    MatDialogModule,
    MatTabsModule,
    AuthModule
  ],
  exports:[
    HeaderComponent,
  ],
  declarations: [HeaderComponent ],
  entryComponents:[
    LoginDialogComponent
  ]
})
export class HeaderModule { }
