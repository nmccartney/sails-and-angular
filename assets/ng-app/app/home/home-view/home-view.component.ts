import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'ng-app/app/auth/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-view',
  templateUrl: './home-view.component.html',
  styleUrls: ['./home-view.component.scss']
})
export class HomeViewComponent implements OnInit {

  constructor(private auth:AuthenticationService, private router: Router) { }

  ngOnInit() {
    // this.auth.checkIn().subscribe(
    //   data => {
    //     console.log('get check-in success : ', data);
    //     this.router.navigate(['user']);

    //   },
    //   error => {
    //     console.log('get check-in failed : ', error);
    //   });
  }

}
