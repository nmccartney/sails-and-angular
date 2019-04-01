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
var EventService = /** @class */ (function () {
    function EventService(http) {
        this.http = http;
    }
    EventService.prototype.create = function (params) {
        return this.http.post("http://localhost:1337/event", params)
            .pipe(map(function (resp) {
            console.log('created event - ', resp);
            return resp;
        }));
    };
    EventService.prototype.delete = function (params) {
        var options = {
            body: params
        };
        return this.http.delete("http://localhost:1337/event/", options)
            .pipe(map(function (resp) {
            console.log('deleted event - ', resp);
            return resp;
        }));
    };
    EventService.prototype.edit = function (params) {
        return this.http.post("http://localhost:1337/event/" + params.uid, params)
            .pipe(map(function (resp) {
            console.log('edited event - ', resp);
            return resp;
        }));
    };
    EventService.prototype.find = function () {
        return this.http.get("http://localhost:1337/event")
            .pipe(map(function (resp) {
            // console.log('got events - ', resp);
            return resp;
        }));
    };
    EventService.prototype.findOne = function (params) {
        var options = {
            body: params
        };
        return this.http
            .get("http://localhost:1337/event/" + params.uid)
            .pipe(map(function (resp) {
            // console.log('got event - ', resp);
            return resp;
        }));
    };
    EventService = __decorate([
        Injectable({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [HttpClient])
    ], EventService);
    return EventService;
}());
export { EventService };
//# sourceMappingURL=event.service.js.map