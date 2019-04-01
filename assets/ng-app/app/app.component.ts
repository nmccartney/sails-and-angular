import { Component, OnInit } from '@angular/core';
import { SailsClient } from 'ngx-sails';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'ng-v6';

  constructor(private sails: SailsClient) { }

  ngOnInit() {
    console.log('sails - ', this.sails);

    this.sails.on('user').subscribe(res => {
      console.log('WB-user:',res);
    });

    this.sails.on('message').subscribe(res => {
      console.log('WB-message:',res);
    });

    this.sails.on('group').subscribe(res => {
      console.log('WB-group:',res);
    });

    this.sails.on('/message').subscribe(res => {
      console.log('WB-message:',res);
    });
    this.sails.requestErrors.subscribe(res => {
      console.log('WB-errors:',res);
    });
  }
}
