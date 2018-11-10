import { Component, OnInit } from '@angular/core';
import { SailsClient } from 'ngx-sails';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'ng-v6';

  constructor(private sails: SailsClient) { }

  ngOnInit() {
    // this.sails.get('/api').subscribe(res => {
    //   console.log(res);
    // });
  }
}
