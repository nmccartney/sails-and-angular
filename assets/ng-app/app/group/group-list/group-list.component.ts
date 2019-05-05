import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { GroupService } from '../group.service';
import { UserService } from 'ng-app/app/user/user.service';

@Component({
  selector: 'app-group-list',
  templateUrl: './group-list.component.html',
  styleUrls: ['./group-list.component.scss']
})
export class GroupListComponent implements OnInit {

  private _user;
  groups: any;
  activeGroup: any;

  @Input()
  get active() { return this._active; }
  set active(group) { this._active = group; }
  private _active;

  @Output() groupSelected: EventEmitter<any> = new EventEmitter();

  constructor(private _gs: GroupService,
    private _us: UserService) { }

  ngOnInit() {
    let strUser = this._us.findMe();
    this._user = strUser ? JSON.parse(strUser) : null;
    // console.log('user found! : ', this._user.uid);
    if (this._user && this._user.uid) {
      console.log('user found! : ', this._user.uid);
      this.getGroups();
    } else {
      console.log('no user found!');
    }
  }

  getGroups() {
    this._gs.userGroups({ uid: this._user.uid || '?' })
      .subscribe((groups) => {
        console.log('groups - ', groups);
        this.groups = groups;
      })
  }

  clickHander(group: any, event: any) {
    this.active = group;
    this.groupSelected.emit({
      group: group,
      event: event
    });
  }

}
