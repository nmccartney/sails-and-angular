var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, ViewChild } from '@angular/core';
import { UserService } from 'ng-app/app/user/user.service';
import { MatDialog, MatSnackBar, MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { UserEditDialogComponent } from './user-edit-dialog/user-edit-dialog.component';
var UserManagerComponent = /** @class */ (function () {
    function UserManagerComponent(us, dialog, bar) {
        this.us = us;
        this.dialog = dialog;
        this.bar = bar;
        this.userDefs = ['id', 'username', 'uid', 'createdAt', 'actions'];
    }
    UserManagerComponent.prototype.ngOnInit = function () {
        this.setUsers();
    };
    UserManagerComponent.prototype.setUsers = function () {
        var _this = this;
        this.us.find()
            .subscribe(function (data) {
            _this.users = new MatTableDataSource(data);
            _this.users.sort = _this.sort;
            _this.users.paginator = _this.paginator;
            console.log('users find', data);
            _this.bar.open('got users', 'success', { duration: 3000 });
        }, function (error) {
            console.log('viewing edit failed : ', error);
            _this.bar.open(error.message, 'error', { duration: 3000 });
        });
    };
    UserManagerComponent.prototype.onEdit = function (user) {
        var _this = this;
        var editDialogRef = this.dialog.open(UserEditDialogComponent, {
            height: '80%',
            width: '80%',
            data: user
        });
        editDialogRef.afterClosed().subscribe(function (result) {
            _this.bar.open('User updated', 'success', { duration: 3000 });
            _this.setUsers();
        });
    };
    UserManagerComponent.prototype.onDelete = function (params) {
        var data = {
            uid: params.uid
        };
        this.bar.open('not available at this time', 'info', { duration: 3000 });
        //   console.log(params, data);
        //   this.us.delete(data).subscribe(
        //     data => {
        //       this.setUsers();
        //     }, err => {
        //       console.log('edit delete failed!');
        //     });
    };
    var _a;
    __decorate([
        ViewChild(MatSort),
        __metadata("design:type", MatSort)
    ], UserManagerComponent.prototype, "sort", void 0);
    __decorate([
        ViewChild(MatPaginator),
        __metadata("design:type", MatPaginator)
    ], UserManagerComponent.prototype, "paginator", void 0);
    UserManagerComponent = __decorate([
        Component({
            selector: 'user-manager',
            templateUrl: './user-manager.component.html',
            styleUrls: ['./user-manager.component.scss']
        }),
        __metadata("design:paramtypes", [typeof (_a = typeof UserService !== "undefined" && UserService) === "function" && _a || Object, MatDialog,
            MatSnackBar])
    ], UserManagerComponent);
    return UserManagerComponent;
}());
export { UserManagerComponent };
//# sourceMappingURL=user-manager.component.js.map