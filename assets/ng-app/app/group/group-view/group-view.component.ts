import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SailsClient } from 'ngx-sails';

@Component({
  selector: 'app-group-view',
  templateUrl: './group-view.component.html',
  styleUrls: ['./group-view.component.scss']
})
export class GroupViewComponent implements OnInit {

  navLinks: any[];
  activeLinkIndex = -1;

  constructor(
    private sails: SailsClient,
    private router: Router
  ) {
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

    this.router.events.subscribe((res) => {
      // this.activeLinkIndex = this.navLinks
      //   .indexOf(this.navLinks.find(tab => tab.link === '.' + this.router.url));
    });
  }

}
