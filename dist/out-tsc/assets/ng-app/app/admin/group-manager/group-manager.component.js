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
// import { GroupService } from '../group.service';
import { MatDialog } from '@angular/material';
import { CreateDialogComponent } from './create-dialog/create-dialog.component';
import { EditDialogComponent } from './edit-dialog/edit-dialog.component';
import { GroupService } from 'ng-app/app/group/group.service';
var GroupManagerComponent = /** @class */ (function () {
    function GroupManagerComponent(gs, dialog) {
        this.gs = gs;
        this.dialog = dialog;
        this.groupDefs = ['id', 'name', 'createdAt', 'actions'];
    }
    GroupManagerComponent.prototype.ngOnInit = function () {
        this.setGroups();
    };
    GroupManagerComponent.prototype.setGroups = function () {
        var _this = this;
        this.gs.find()
            .subscribe(function (data) {
            _this.groups = data;
        }, function (error) {
            console.log('viewing group failed : ', error);
        });
    };
    GroupManagerComponent.prototype.create = function () {
        var _this = this;
        var createDialogRef = this.dialog.open(CreateDialogComponent, {
            height: '350px',
            data: {}
        });
        createDialogRef.afterClosed().subscribe(function (result) {
            console.log('The dialog was closed');
            _this.setGroups();
        });
    };
    GroupManagerComponent.prototype.onEdit = function (group) {
        var _this = this;
        var editDialogRef = this.dialog.open(EditDialogComponent, {
            height: '80%',
            width: '80%',
            data: group
        });
        editDialogRef.afterClosed().subscribe(function (result) {
            console.log('The dialog was closed');
            _this.setGroups();
        });
    };
    GroupManagerComponent.prototype.onDelete = function (params) {
        var _this = this;
        var data = {
            uid: params.uid
        };
        console.log(params, data);
        this.gs.delete(data).subscribe(function (data) {
            _this.setGroups();
        }, function (err) {
            console.log('group delete failed!');
        });
    };
    var _a;
    GroupManagerComponent = __decorate([
        Component({
            selector: 'group-manager',
            templateUrl: './group-manager.component.html',
            styleUrls: ['./group-manager.component.scss']
        }),
        __metadata("design:paramtypes", [typeof (_a = typeof GroupService !== "undefined" && GroupService) === "function" && _a || Object, MatDialog])
    ], GroupManagerComponent);
    return GroupManagerComponent;
}());
export { GroupManagerComponent };
//# sourceMappingURL=group-manager.component.js.map