import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { MatDialog, MatSnackBar } from '@angular/material';
import { LoginDialogComponent } from '../auth/login-dialog/login-dialog.component';
import { AuthenticationService } from '../auth/authentication.service';
import { Router } from '@angular/router';
import { UserCurrentService } from '../user/user-current.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  isAuthenticated: boolean = false;
  @Output() onMenuSelect = new EventEmitter();
  menuSelected: boolean = false;

  private _currentUser: any;
  @Input()
  get currentUser() { return this._currentUser; }
  set currentUser(value: any) { this._currentUser = value; }

  constructor(
    public dialog: MatDialog,
    private bar: MatSnackBar,
    private currUserService: UserCurrentService,
    private auth: AuthenticationService,
    private router: Router) { }

  ngOnInit() {
    this.isAuthenticated = this.auth.hasToken();

    if (this.isAuthenticated) {
      this.auth.checkIn().subscribe((data) => {
        console.log('checkin ', data);
      });
    }

    this.currentUser = this.currUserService.currentUser;
    console.log('current user - ', this.currentUser);
    this.currUserService.userChanges.subscribe((user) => {
      console.log('current user updated - ', user);
      this.currentUser = this.currUserService.currentUser;
    })
  }

  menuHandler(event: MouseEvent) {
    this.menuSelected = !this.menuSelected;
    this.onMenuSelect.emit(this.menuSelected);
  }

  openLogin() {
    const dialogRef = this.dialog
      .open(LoginDialogComponent, {
        height: '400px',
        data: {}
      });

    dialogRef.afterClosed()
      .subscribe(result => {
        console.log('The dialog was closed', result);
        this.isAuthenticated = this.auth.isAuthenticated();

        if (result && result.returnUrl) {
          this.router.navigateByUrl(result.returnUrl);
        }
      });
  }

  logout() {
    this.auth.logout().subscribe(data => {
      console.log('logged out', data);
      this.isAuthenticated = this.auth.isAuthenticated();
      this.bar.open('Successfully logged out!', 'success', { duration: 1000 });
      this.router.navigateByUrl('/');
    }, err => {
      console.log('error logging out ', err);
    });
  }

}
