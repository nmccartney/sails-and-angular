import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FullpageDirective } from './fullpage.directive';
import { WindowRefService } from '../window-ref.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [FullpageDirective],
  exports: [FullpageDirective],
  providers: [WindowRefService]
})
export class AppCoreModule { }
