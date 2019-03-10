import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { first } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { AuthenticationService } from 'ng-app/app/auth/authentication.service';
import { DateAdapter } from 'angular-calendar';
import { MomentDatetimeAdapter, MAT_MOMENT_DATETIME_FORMATS } from '@mat-datetimepicker/moment';
import { MAT_DATE_LOCALE } from '@angular/material';
import { MAT_DATETIME_FORMATS } from '@mat-datetimepicker/core';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss'],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDatetimeAdapter,
      deps: [MAT_DATE_LOCALE]
    },
    {
      provide: MAT_DATETIME_FORMATS,
      useValue: MAT_MOMENT_DATETIME_FORMATS
    }
  ],
})
export class ViewComponent implements OnInit {

  store: any = JSON.parse(localStorage.getItem('currentUser'));
  user: any;
  users;
  returnUrl;
  groupDefs = ['id','username','uid','createdAt','actions'];

  constructor(private route: ActivatedRoute,
    private us: UserService,
    private auth: AuthenticationService) { }

  ngOnInit() {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';

    this.setUsers();

    if (!this.store) {
      return;
    }

    this.setUser();
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
