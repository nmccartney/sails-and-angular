import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MessageService } from 'ng-app/app/message/message.service';
import { MatSnackBar } from '@angular/material';
import { SailsClient } from 'ngx-sails';
import { map, first } from 'rxjs/operators';

@Component({
  selector: 'app-edit-chat',
  templateUrl: './edit-chat.component.html',
  styleUrls: ['./edit-chat.component.scss']
})
export class EditChatComponent implements OnInit {

  messageForm: FormGroup;
  messages: any;

  @Input()
  get group() { return this._group; }
  set group(value) {
    this._group = value;
    this.getMessages();
  }
  private _group;

  constructor(
    private sails: SailsClient,
    private ms: MessageService,
    private bar: MatSnackBar) { }

  ngOnInit() {
    this.messageForm = this.createFormGroup();
  }

  getMessages() {
    if (!this._group) return;
    this.ms
      .find({ groupId: this.group.id })
      .subscribe(
        data => {
          console.log('get messages success : ', data);
          this.messages = data;
        },
        error => {
          this.bar.open(error.message, 'error', { duration: 3000 });
        });

    this.sails
      .get('/group/' + this.group.id + '/messages')
      .subscribe(res => {
        // console.log('ss : ', res);
        // this subscribes to the group for socket events
      });

    // Listen for group socket events
    this.sails.on('group').subscribe(res => {
      if(this._group.id !== res.group) return;
      this.sails.get('/message/' + res.uid)
        .pipe(map((resp: any) => { return resp.data[0];}))
        .subscribe(res => {
          this.messages.push(res);
        });
    });
  }

  sendMessage() {
    this.ms.create({
      author: '4',
      type: 'admin',
      group: this._group.id,
      ...this.messageForm.value,
    }).subscribe(
      data => {
        this.messageForm.controls['content'].setValue('');
      },
      error => {
        this.bar.open(error.message, 'error', { duration: 3000 });
      });
  }

  private createFormGroup() {
    return new FormGroup({
      type: new FormControl('admin'),
      content: new FormControl()
    });
  }
}
