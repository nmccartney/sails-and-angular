var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, Input } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MessageService } from 'ng-app/app/message/message.service';
import { MatSnackBar } from '@angular/material';
import { SailsClient } from 'ngx-sails';
var EditChatComponent = /** @class */ (function () {
    function EditChatComponent(sails, ms, bar) {
        this.sails = sails;
        this.ms = ms;
        this.bar = bar;
    }
    Object.defineProperty(EditChatComponent.prototype, "group", {
        get: function () { return this._group; },
        set: function (value) {
            this._group = value;
            this.getMessages();
        },
        enumerable: true,
        configurable: true
    });
    EditChatComponent.prototype.ngOnInit = function () {
        this.messageForm = this.createFormGroup();
    };
    EditChatComponent.prototype.getMessages = function () {
        var _this = this;
        if (!this._group)
            return;
        this.ms
            .find({ groupId: this.group.id })
            .subscribe(function (data) {
            console.log('get messages success : ', data);
            _this.messages = data;
        }, function (error) {
            _this.bar.open(error.message, 'error', { duration: 3000 });
        });
        this.sails.on('user').subscribe(function (res) {
            console.log('ss : ', res);
        });
    };
    EditChatComponent.prototype.sendMessage = function () {
        var _this = this;
        this.ms.create(__assign({ author: '4', type: 'admin', group: this._group.id }, this.messageForm.value)).subscribe(function (data) {
            _this.messageForm.controls['content'].setValue('');
        }, function (error) {
            _this.bar.open(error.message, 'error', { duration: 3000 });
        });
    };
    EditChatComponent.prototype.createFormGroup = function () {
        return new FormGroup({
            type: new FormControl('admin'),
            content: new FormControl()
        });
    };
    var _a;
    __decorate([
        Input(),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [Object])
    ], EditChatComponent.prototype, "group", null);
    EditChatComponent = __decorate([
        Component({
            selector: 'app-edit-chat',
            templateUrl: './edit-chat.component.html',
            styleUrls: ['./edit-chat.component.scss']
        }),
        __metadata("design:paramtypes", [SailsClient, typeof (_a = typeof MessageService !== "undefined" && MessageService) === "function" && _a || Object, MatSnackBar])
    ], EditChatComponent);
    return EditChatComponent;
}());
export { EditChatComponent };
//# sourceMappingURL=edit-chat.component.js.map