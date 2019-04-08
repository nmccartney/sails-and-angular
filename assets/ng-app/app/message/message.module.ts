import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatViewComponent } from './chat-view/chat-view.component';

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [ChatViewComponent],
  declarations: [ChatViewComponent]
})
export class MessageModule { }
