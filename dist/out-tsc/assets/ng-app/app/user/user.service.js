var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
var UserService = /** @class */ (function () {
    function UserService(http) {
        this.http = http;
    }
    UserService.prototype.edit = function (user) {
        return this.http
            .post("http://localhost:1337/edit", { params: { uid: user.uid } })
            .pipe(map(function (resp) {
            return resp;
        }));
    };
    UserService.prototype.findMe = function () {
        var user = localStorage.getItem('currentUser');
        if (!user)
            return false;
        return user;
    };
    UserService.prototype.findOne = function (uid) {
        return this.http
            .get("http://localhost:1337/view", { params: { uid: uid } })
            .pipe(map(function (resp) {
            // console.log('got user - ', resp);
            return resp;
        }));
    };
    UserService.prototype.find = function () {
        return this.http.get("http://localhost:1337/user")
            .pipe(map(function (resp) {
            // console.log('got users - ', resp);
            return resp;
        }));
    };
    UserService = __decorate([
        Injectable({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [HttpClient])
    ], UserService);
    return UserService;
}());
export { UserService };
//# sourceMappingURL=user.service.js.map