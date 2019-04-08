import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { GroupService } from 'ng-app/app/group/group.service';
import { UserService } from 'ng-app/app/user/user.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit, AfterViewInit {

  @Input()
  get group() { return this._group; }
  set group(value) {
    this._group = value;
  }
  private _group: any;

  get users (){ return this._users;}
  private _users;

  constructor(
    private _gs: GroupService,
    private bar: MatSnackBar,
  ) { }

  ngOnInit() { }

  ngAfterViewInit() {
    if (this.group) {
      this._getUsers();
      Promise.resolve().then(() => {
        this.bar.open('Static Group UID used for users', 'warning', { duration: 3000});
      });
    } else {
      Promise.resolve().then(() => {
        this.bar.open('No Group provided - cannot get group.users', 'error', { duration: 3000 });
      });
    }
  }

  private _getUsers() {
    this._gs.getUsers({ uid: this.group.uid || '?' })
      .subscribe((_users) => {
        this._users = _users;
      })
  }

}
