import { Component, OnInit, Optional, Host } from '@angular/core';
import { SailsClient } from 'ngx-sails';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { AuthenticationService } from '../authentication.service';
import { LoginDialogComponent } from '../login-dialog/login-dialog.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  error = '';

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    @Optional() @Host() private parent: LoginDialogComponent) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });

    // reset login status
    this.authenticationService.logout();

    // get return url from route parameters or default to '/'
    if (this.parent) {
      this.returnUrl = this.parent.returnUrl || 'user';
    } else {
      this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || 'user';
    }
  }

  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }

  onSubmit() {
    this.submitted = true;

    // console.log('submitting ', this.loginForm);

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;
    this.authenticationService.login(this.f.username.value, this.f.password.value)
      .pipe(first())
      .subscribe(
        data => {
          console.log('user  logged in ', data);
          if (this.parent) {
            this.parent.dialogRef.close({ returnUrl: this.returnUrl });
          } else {
            this.router.navigate([this.returnUrl]);
          }

        },
        error => {
          this.error = error;
          this.loading = false;
        });
  }
}
