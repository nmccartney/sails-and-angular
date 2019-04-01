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
var GroupService = /** @class */ (function () {
    function GroupService(http) {
        this.http = http;
    }
    GroupService.prototype.create = function (params) {
        return this.http.post("http://localhost:1337/group", params)
            .pipe(map(function (resp) {
            console.log('created group - ', resp);
            return resp;
        }));
    };
    GroupService.prototype.delete = function (params) {
        var options = {
            body: params
        };
        return this.http.delete("http://localhost:1337/group/", options)
            .pipe(map(function (resp) {
            console.log('deleted group - ', resp);
            return resp;
        }));
    };
    GroupService.prototype.edit = function (params) {
        return this.http.post("http://localhost:1337/group/" + params.uid, params)
            .pipe(map(function (resp) {
            console.log('edited group - ', resp);
            return resp;
        }));
    };
    GroupService.prototype.find = function () {
        return this.http.get("http://localhost:1337/group")
            .pipe(map(function (resp) {
            // console.log('got groups - ', resp);
            return resp;
        }));
    };
    GroupService.prototype.findOne = function (params) {
        var options = {
            body: params
        };
        return this.http
            .get("http://localhost:1337/group/" + params.uid)
            .pipe(map(function (resp) {
            // console.log('got group - ', resp);
            return resp;
        }));
    };
    GroupService = __decorate([
        Injectable({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [HttpClient])
    ], GroupService);
    return GroupService;
}());
export { GroupService };
//# sourceMappingURL=group.service.js.map