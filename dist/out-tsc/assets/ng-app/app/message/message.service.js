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
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
var MessageService = /** @class */ (function () {
    function MessageService(http) {
        this.http = http;
    }
    MessageService.prototype.create = function (params) {
        return this.http.post("http://localhost:1337/group/" + params.group + "/message", params)
            .pipe(map(function (resp) {
            return resp;
        }));
    };
    MessageService.prototype.delete = function (params) {
        return this.http.delete("http://localhost:1337/message/", params)
            .pipe(map(function (resp) {
            console.log('deleted message - ', resp);
            return resp;
        }));
    };
    MessageService.prototype.find = function (params) {
        return this.http.get("http://localhost:1337/group/" + params.groupId + "/messages")
            .pipe(map(function (resp) {
            // console.log('got message - ', resp);
            return resp;
        }));
    };
    MessageService = __decorate([
        Injectable({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [HttpClient])
    ], MessageService);
    return MessageService;
}());
export { MessageService };
//# sourceMappingURL=message.service.js.map