import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeViewComponent } from './home-view/home-view.component';
import { AuthModule } from '../auth/auth.module';
import { MatTabsModule } from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    AuthModule,
    MatTabsModule
  ],
  declarations: [HomeViewComponent]
})
export class HomeModule { }
