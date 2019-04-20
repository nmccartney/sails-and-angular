import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatViewComponent } from './chat-view/chat-view.component';
import { messageRoutes } from './message.routes';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(messageRoutes),
  ],
  exports: [ChatViewComponent],
  declarations: [ChatViewComponent]
})
export class MessageModule { }
