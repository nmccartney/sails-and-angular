var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
import { Component, Optional, Host } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { AuthenticationService } from '../authentication.service';
import { LoginDialogComponent } from '../login-dialog/login-dialog.component';
var LoginComponent = /** @class */ (function () {
    function LoginComponent(formBuilder, route, router, authenticationService, parent) {
        this.formBuilder = formBuilder;
        this.route = route;
        this.router = router;
        this.authenticationService = authenticationService;
        this.parent = parent;
        this.loading = false;
        this.submitted = false;
        this.error = '';
    }
    LoginComponent.prototype.ngOnInit = function () {
        this.loginForm = this.formBuilder.group({
            username: ['', Validators.required],
            password: ['', Validators.required]
        });
        // reset login status
        this.authenticationService.logout();
        // get return url from route parameters or default to '/'
        if (this.parent) {
            this.returnUrl = this.parent.returnUrl || 'user';
        }
        else {
            this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || 'user';
        }
    };
    Object.defineProperty(LoginComponent.prototype, "f", {
        // convenience getter for easy access to form fields
        get: function () { return this.loginForm.controls; },
        enumerable: true,
        configurable: true
    });
    LoginComponent.prototype.onSubmit = function () {
        var _this = this;
        this.submitted = true;
        // console.log('submitting ', this.loginForm);
        // stop here if form is invalid
        if (this.loginForm.invalid) {
            return;
        }
        this.loading = true;
        this.authenticationService.login(this.f.username.value, this.f.password.value)
            .pipe(first())
            .subscribe(function (data) {
            console.log('user  logged in ', data);
            if (_this.parent) {
                _this.parent.dialogRef.close({ returnUrl: _this.returnUrl });
            }
            else {
                _this.router.navigate([_this.returnUrl]);
            }
        }, function (error) {
            _this.error = error;
            _this.loading = false;
        });
    };
    LoginComponent = __decorate([
        Component({
            selector: 'app-login',
            templateUrl: './login.component.html',
            styleUrls: ['./login.component.css']
        }),
        __param(4, Optional()), __param(4, Host()),
        __metadata("design:paramtypes", [FormBuilder,
            ActivatedRoute,
            Router,
            AuthenticationService,
            LoginDialogComponent])
    ], LoginComponent);
    return LoginComponent;
}());
export { LoginComponent };
//# sourceMappingURL=login.component.js.map