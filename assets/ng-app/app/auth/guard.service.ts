import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthenticationService } from './authentication.service';
import { MatSnackBar } from '@angular/material';

@Injectable()
export class GuardService implements CanActivate {

  constructor(
    public auth: AuthenticationService,
    public router: Router,
    private bar: MatSnackBar) {}

  canActivate(): boolean {
    if (!this.auth.isAuthenticated()) {
      this.router.navigate(['/']);
      this.bar.open('Not Authorized!', 'error', { duration: 2000 });
      return false;
    }
    return true;
  }

}
