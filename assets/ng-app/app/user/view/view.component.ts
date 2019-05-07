import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { first } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { AuthenticationService } from 'ng-app/app/auth/authentication.service';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewComponent implements OnInit {

  store: any = JSON.parse(localStorage.getItem('currentUser'));
  user: any;
  users;
  navLinks: any[];
  returnUrl;
  groupDefs = ['id', 'username', 'uid', 'createdAt', 'actions'];

  constructor(private route: ActivatedRoute,
    private us: UserService,
    private auth: AuthenticationService) {
    this.navLinks = [
      {
        label: 'Message',
        link: './messages',
        icon: 'chat',
        index: 0
      }, {
        label: 'Map',
        link: './map',
        icon: 'map',
        index: 1
      }, {
        label: 'Events',
        link: './events',
        icon: 'event',
        index: 2
      },
    ];
  }

  ngOnInit() {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';

    this.setUsers();

    if (!this.store) {
      return;
    }

    this.setUser();
  }

  getTabUrl(link) {
    console.log('should be getting tab url.. WIP');
    return '';
    // return this.activeGroup ? link + '/' + this.activeGroup.uid : link;
  }

  setUser() {
    this.us.findOne(this.store.uid)
      .pipe(first())
      .subscribe(
        data => {
          // console.log('get user success : ', data);
          this.user = data.user;
          //TODO: goto login screen
        },
        error => {
          console.log('viewing user failed : ', error);
        });
  }

  setUsers() {
    this.us.find()
      .subscribe(
        data => {
          // console.log('get users success : ', data);
          this.users = data;
          //TODO: goto login screen
        },
        error => {
          console.log('viewing user failed : ', error);
        });
  }

}
