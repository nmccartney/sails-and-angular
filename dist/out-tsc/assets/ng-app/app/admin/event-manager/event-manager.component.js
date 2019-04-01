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
// import { EventService } from '../event.service';
import { MatDialog, MatSnackBar, MatSort, MatTableDataSource, MAT_DATE_LOCALE } from '@angular/material';
import { CreateDialogComponent } from './create-dialog/create-dialog.component';
import { EditDialogComponent } from './edit-dialog/edit-dialog.component';
import { EventService } from 'ng-app/app/event/event.service';
import { MAT_MOMENT_DATETIME_FORMATS, MomentDatetimeAdapter } from '@mat-datetimepicker/moment';
import { MAT_DATETIME_FORMATS } from '@mat-datetimepicker/core';
import { DateAdapter } from 'angular-calendar';
var EventManagerComponent = /** @class */ (function () {
    function EventManagerComponent(es, dialog, bar) {
        this.es = es;
        this.dialog = dialog;
        this.bar = bar;
        this.eventDefs = ['id', 'name', 'time', 'location', 'createdAt', 'actions'];
    }
    EventManagerComponent.prototype.ngOnInit = function () {
        this.setEvents();
    };
    EventManagerComponent.prototype.setEvents = function () {
        var _this = this;
        this.es.find()
            .subscribe(function (data) {
            _this.events = new MatTableDataSource(data);
            _this.events.sort = _this.sort;
            _this.bar.open('got events', 'success', { duration: 3000 });
        }, function (error) {
            console.log('viewing edit failed : ', error);
            _this.bar.open(error.message, 'error', { duration: 3000 });
        });
    };
    EventManagerComponent.prototype.create = function () {
        var _this = this;
        var createDialogRef = this.dialog.open(CreateDialogComponent, {
            height: '350px',
            data: {}
        });
        createDialogRef.afterClosed().subscribe(function (result) {
            console.log('The dialog was closed');
            _this.setEvents();
        });
    };
    EventManagerComponent.prototype.onEdit = function (event) {
        var _this = this;
        var editDialogRef = this.dialog.open(EditDialogComponent, {
            height: '80%',
            width: '80%',
            data: event
        });
        editDialogRef.afterClosed().subscribe(function (result) {
            console.log('The dialog was closed');
            _this.setEvents();
        });
    };
    EventManagerComponent.prototype.onDelete = function (params) {
        var _this = this;
        var data = {
            uid: params.uid
        };
        console.log(params, data);
        this.es.delete(data).subscribe(function (data) {
            _this.setEvents();
        }, function (err) {
            console.log('edit delete failed!');
        });
    };
    var _a;
    __decorate([
        ViewChild(MatSort),
        __metadata("design:type", MatSort)
    ], EventManagerComponent.prototype, "sort", void 0);
    EventManagerComponent = __decorate([
        Component({
            selector: 'event-manager',
            templateUrl: './event-manager.component.html',
            styleUrls: ['./event-manager.component.scss'],
            providers: [
                { provide: DateAdapter, useClass: MomentDatetimeAdapter, deps: [MAT_DATE_LOCALE] },
                {
                    provide: MAT_DATETIME_FORMATS,
                    useValue: MAT_MOMENT_DATETIME_FORMATS
                }
            ],
        }),
        __metadata("design:paramtypes", [typeof (_a = typeof EventService !== "undefined" && EventService) === "function" && _a || Object, MatDialog,
            MatSnackBar])
    ], EventManagerComponent);
    return EventManagerComponent;
}());
export { EventManagerComponent };
//# sourceMappingURL=event-manager.component.js.map