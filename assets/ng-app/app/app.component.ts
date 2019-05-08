import { Component, OnInit, ViewChild } from '@angular/core';
import { SailsClient } from 'ngx-sails';
import { MatSidenav } from '@angular/material';
import { Router } from '@angular/router';
import { group } from '@angular/animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'ng-v6';
  activeGroup: any;
  private _currentUser:any;
  get currentUser() {return this._currentUser}

  constructor(
    private sails: SailsClient,
    private router: Router) {
  }

  ngOnInit() {
    console.log('sails - ', this.sails);

    this.sails.on('user').subscribe(res => {
      console.log('WB-user:', res);
    });

    this.sails.on('message').subscribe(res => {
      console.log('WB-message:', res);
    });

    this.sails.on('group').subscribe(res => {
      console.log('WB-group:', res);
    });

    this.sails.on('/message').subscribe(res => {
      console.log('WB-message:', res);
    });
    this.sails.requestErrors.subscribe(res => {
      console.log('WB-errors:', res);
    });
  }

  @ViewChild(MatSidenav) sidenav: MatSidenav;

  menuHandler(value: any) {
    this.sidenav.toggle();
  }

  getTabUrl(link) {
    return this.activeGroup ? link + '/' + this.activeGroup.uid : link;
  }

  onGroupSelected(event: { group: any, event: any }) {
    console.log(event);
    this.activeGroup = event.group;
    this.sidenav.toggle();
    this.router.navigate(['/map', event.group.uid]);
  }
}
