import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { first } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from 'ng-app/app/auth/authentication.service';
import { GroupService } from 'ng-app/app/group/group.service';
import { UserCurrentService } from '../user-current.service';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewComponent implements OnInit {

  store: any = JSON.parse(localStorage.getItem('currentUser'));
  user: any;
  currUser: any;
  users;
  groups;
  returnUrl;
  groupDefs = ['id', 'username', 'uid', 'createdAt', 'actions'];

  constructor(
    private route: ActivatedRoute,
    private _gs: GroupService,
    private us: UserService,
    private router: Router,
    private currUserService:UserCurrentService,
    private auth: AuthenticationService) {

    this.currUser = this.currUserService.currentUser;
    this.currUserService.userChanges.subscribe((user)=>{
        console.log('sub user ',user);
        this.currUser = user;
    });
  }

  ngOnInit() {
    // this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';

    this.getGroups();
  }

  getGroups() {
    this._gs.userGroups({ uid: this.currUser.uid || '?' })
      .subscribe((groups) => {
        this.groups = groups;
      })
  }

  gotoGroup(group){

  }

  addGroupHandler($event){
    this.router.navigate(['/group/new']);
  }

}
