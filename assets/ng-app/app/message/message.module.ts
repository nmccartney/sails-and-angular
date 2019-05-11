import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatViewComponent } from './chat-view/chat-view.component';
import { messageRoutes } from './message.routes';
import { RouterModule } from '@angular/router';
import { AppCoreModule } from '../app-core/app-core.module';

@NgModule({
  imports: [
    AppCoreModule,
    CommonModule,
    RouterModule.forRoot(messageRoutes),
  ],
  exports: [ChatViewComponent],
  declarations: [ChatViewComponent]
})
export class MessageModule { }
