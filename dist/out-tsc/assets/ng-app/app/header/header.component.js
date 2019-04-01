var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material';
import { LoginDialogComponent } from '../auth/login-dialog/login-dialog.component';
import { AuthenticationService } from '../auth/authentication.service';
import { Router } from '@angular/router';
var HeaderComponent = /** @class */ (function () {
    function HeaderComponent(dialog, auth, router) {
        this.dialog = dialog;
        this.auth = auth;
        this.router = router;
        this.isAuthenticated = false;
    }
    HeaderComponent.prototype.ngOnInit = function () {
        this.isAuthenticated = this.auth.isAuthenticated();
    };
    HeaderComponent.prototype.openLogin = function () {
        var _this = this;
        var dialogRef = this.dialog
            .open(LoginDialogComponent, {
            height: '400px',
            data: {}
        });
        dialogRef.afterClosed()
            .subscribe(function (result) {
            console.log('The dialog was closed', result);
            _this.isAuthenticated = _this.auth.isAuthenticated();
            if (result && result.returnUrl) {
                _this.router.navigateByUrl(result.returnUrl);
            }
        });
    };
    HeaderComponent.prototype.logout = function () {
        var _this = this;
        this.auth.logout().subscribe(function (data) {
            console.log('logged out', data);
            _this.isAuthenticated = _this.auth.isAuthenticated();
            _this.router.navigateByUrl('/');
        }, function (err) {
            console.log('error logging out ', err);
        });
    };
    HeaderComponent = __decorate([
        Component({
            selector: 'app-header',
            templateUrl: './header.component.html',
            styleUrls: ['./header.component.scss']
        }),
        __metadata("design:paramtypes", [MatDialog,
            AuthenticationService,
            Router])
    ], HeaderComponent);
    return HeaderComponent;
}());
export { HeaderComponent };
//# sourceMappingURL=header.component.js.map