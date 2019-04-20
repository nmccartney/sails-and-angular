import { Component, OnInit, ViewChild } from '@angular/core';
import { SailsClient } from 'ngx-sails';
import { MatSidenav } from '@angular/material';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'ng-v6';
  navLinks: any[];
  activeLinkIndex = -1;

  constructor(
    private sails: SailsClient,
    private router: Router) {

    this.navLinks = [
      {
        label: 'Message',
        link: './messages',
        icon:'chat',
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
    console.log('sails - ', this.sails);

    this.router.events.subscribe((res) => {
      this.activeLinkIndex = this.navLinks.indexOf(this.navLinks.find(tab => tab.link === '.' + this.router.url));
    });

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
}
