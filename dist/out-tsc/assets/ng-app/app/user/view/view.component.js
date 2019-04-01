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
import { UserService } from '../user.service';
import { first } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { AuthenticationService } from 'ng-app/app/auth/authentication.service';
var ViewComponent = /** @class */ (function () {
    function ViewComponent(route, us, auth) {
        this.route = route;
        this.us = us;
        this.auth = auth;
        this.store = JSON.parse(localStorage.getItem('currentUser'));
        this.groupDefs = ['id', 'username', 'uid', 'createdAt', 'actions'];
    }
    ViewComponent.prototype.ngOnInit = function () {
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
        this.setUsers();
        if (!this.store) {
            return;
        }
        this.setUser();
    };
    ViewComponent.prototype.setUser = function () {
        var _this = this;
        this.us.findOne(this.store.uid)
            .pipe(first())
            .subscribe(function (data) {
            // console.log('get user success : ', data);
            _this.user = data.user;
            //TODO: goto login screen
        }, function (error) {
            console.log('viewing user failed : ', error);
        });
    };
    ViewComponent.prototype.setUsers = function () {
        var _this = this;
        this.us.find()
            .subscribe(function (data) {
            // console.log('get users success : ', data);
            _this.users = data;
            //TODO: goto login screen
        }, function (error) {
            console.log('viewing user failed : ', error);
        });
    };
    var _a;
    ViewComponent = __decorate([
        Component({
            selector: 'app-view',
            templateUrl: './view.component.html',
            styleUrls: ['./view.component.scss']
        }),
        __metadata("design:paramtypes", [ActivatedRoute,
            UserService, typeof (_a = typeof AuthenticationService !== "undefined" && AuthenticationService) === "function" && _a || Object])
    ], ViewComponent);
    return ViewComponent;
}());
export { ViewComponent };
//# sourceMappingURL=view.component.js.map