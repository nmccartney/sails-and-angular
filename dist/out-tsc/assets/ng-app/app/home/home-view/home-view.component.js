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
import { AuthenticationService } from 'ng-app/app/auth/authentication.service';
import { Router } from '@angular/router';
var HomeViewComponent = /** @class */ (function () {
    function HomeViewComponent(auth, router) {
        this.auth = auth;
        this.router = router;
    }
    HomeViewComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.auth.checkIn().subscribe(function (data) {
            console.log('get check-in success : ', data);
            _this.router.navigate(['user']);
        }, function (error) {
            console.log('get check-in failed : ', error);
        });
    };
    var _a;
    HomeViewComponent = __decorate([
        Component({
            selector: 'app-home-view',
            templateUrl: './home-view.component.html',
            styleUrls: ['./home-view.component.scss']
        }),
        __metadata("design:paramtypes", [typeof (_a = typeof AuthenticationService !== "undefined" && AuthenticationService) === "function" && _a || Object, Router])
    ], HomeViewComponent);
    return HomeViewComponent;
}());
export { HomeViewComponent };
//# sourceMappingURL=home-view.component.js.map