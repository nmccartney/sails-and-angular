import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material';
import { LoginDialogComponent } from '../auth/login-dialog/login-dialog.component';
import { AuthenticationService } from '../auth/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  private isAuthenticated: boolean = false;

  @Output() onMenuSelect = new EventEmitter();
  menuSelected: boolean = false;

  constructor(
    public dialog: MatDialog,
    private auth: AuthenticationService,
    private router: Router) { }

  ngOnInit() {
    this.isAuthenticated = this.auth.isAuthenticated();
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
      this.router.navigateByUrl('/');
    }, err => {
      console.log('error logging out ', err);
    });
  }

}
