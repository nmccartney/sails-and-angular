import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { SailsClient } from 'ngx-sails';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '../authentication.service';
import { first } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  error = '';

  @Output() register: EventEmitter<any> = new EventEmitter();

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private bar: MatSnackBar,
    private authenticationService: AuthenticationService) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      username: [
        '',
        Validators.compose([
          Validators.required,
          Validators.email
        ])
      ],
      password: [
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(5)
        ])
      ]
    });

    // reset login status
    this.authenticationService.logout();
  }

  // convenience getter for easy access to form fields
  get f() { return this.registerForm.controls; }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.registerForm.invalid) {
      console.log('form invalid', this.registerForm);
      this.bar.open('Register from invalid!', 'error', { duration: 3000 });
      return;
    }

    this.loading = true;
    this.authenticationService
      .register(this.f.username.value, this.f.password.value)
      .pipe(first())
      .subscribe(
        data => {
          this.bar.open('Successfully registered!', 'success', { duration: 1000 });
          this.register.emit(data);
        },
        error => {
          console.error('register failed : ', error);
          if(error.error.code === 'E_UNIQUE'){
            this.bar.open(`Sorry ${JSON.stringify(error.error.attrNames)} already exist!`, 'error', { duration: 3000 });
          }else if(typeof error.error === 'string'){
            this.bar.open('Oops. Check the form for validity!', 'error', { duration: 3000 });
          }else{
            this.bar.open('Oops. Check the form for validity!', 'error', { duration: 3000 });
          }
          this.error = error;
          this.loading = false;
        });
  }
}
