/// <reference types="@types/googlemaps" />
// import { } from 'googlemaps';
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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
import * as _moment from 'moment';
// tslint:disable-next-line:no-duplicate-imports
import { default as _rollupMoment } from 'moment';
var moment = _rollupMoment || _moment;
import { Component, Inject, NgZone, ElementRef, ViewChild, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatDialogRef, MatSnackBar, MAT_DIALOG_DATA } from '@angular/material';
// import { EventService } from '../../event.service';
import { first } from 'rxjs/operators';
import { MapsAPILoader } from '@agm/core';
import { MatDatetimepicker } from '@mat-datetimepicker/core';
import { EventService } from 'ng-app/app/event/event.service';
import { GroupService } from 'ng-app/app/group/group.service';
// See the Moment.js docs for the meaning of these formats:
// https://momentjs.com/docs/#/displaying/format/
export var MY_FORMATS = {
    parse: {
        dateInput: 'YYYY-MM-DDTh:mm',
    },
    display: {
        dateInput: 'YYYY-MM-DDTh:mm',
        monthYearLabel: 'MMM YYYY',
        dateA11yLabel: 'LL',
        monthYearA11yLabel: 'MMMM YYYY',
    },
};
var EditDialogComponent = /** @class */ (function () {
    function EditDialogComponent(dialogRef, bar, es, gs, mapsAPILoader, ngZone, _cd, data) {
        this.dialogRef = dialogRef;
        this.bar = bar;
        this.es = es;
        this.gs = gs;
        this.mapsAPILoader = mapsAPILoader;
        this.ngZone = ngZone;
        this._cd = _cd;
        this.data = data;
        this.event = { name: 'my event' };
        this.latitude = 40.4406248;
        this.longitude = -79.9958864;
        this.zoom = 15;
        //
        this.groupForm = this.createFormGroup();
    }
    EditDialogComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.es.findOne(this.data)
            .pipe(first())
            .subscribe(function (data) {
            _this.event = data;
            _this.groupForm = _this.createFormGroup();
            var ownerName = _this.event.owner && _this.event.owner.username || 'N/A';
            _this.groupForm.controls.owner.setValue(ownerName);
        }, function (error) {
            _this.bar
                .open(error.message, 'error', { duration: 3000 });
        });
        this.gs.find()
            .subscribe(function (data) {
            _this.groups = data;
            console.log('groups ', data);
        }, function (error) {
            _this.bar
                .open(error.message, 'error', { duration: 3000 });
        });
        //
        //load Places Autocomplete
        this.mapsAPILoader.load().then(function () {
            var autocomplete = new google.maps.places
                .Autocomplete(_this.searchElementRef.nativeElement, {
                types: [
                // 'address',
                // 'establishment'
                ],
                fields: [
                    'geometry.location',
                    'place_id',
                ]
            });
            autocomplete.addListener("place_changed", function () {
                _this.ngZone.run(function () {
                    //get the place result
                    var place = autocomplete.getPlace();
                    //verify result
                    if (place.geometry === undefined || place.geometry === null) {
                        console.error(place);
                        _this.bar.open('Map location error', 'Error', { duration: 3000 });
                        return;
                    }
                    console.log(place, _this.searchElementRef.nativeElement.value);
                    //set latitude, longitude and zoom
                    _this.latitude = place.geometry.location.lat();
                    _this.longitude = place.geometry.location.lng();
                    _this.event.place_id = place.place_id;
                    _this.event.gps = { lat: _this.latitude, lng: _this.longitude };
                    _this.zoom = 18;
                    var placeValue = _this.searchElementRef.nativeElement.value;
                    _this.groupForm.controls.location.setValue(placeValue);
                });
            });
        });
    };
    EditDialogComponent.prototype.onGroupSelected = function (event) {
        this.group = event.option.value;
        this.groupForm.controls.group.setValue(event.option.value.name);
    };
    EditDialogComponent.prototype.onSubmit = function () {
        var _this = this;
        var data;
        try {
            data = __assign({}, this.event, this.groupForm.value, { group: this.group && this.group.id || this.event.group.id });
        }
        catch (error) {
            this.bar.open(error, 'Error', { duration: 3000 });
        }
        console.log('submitting : ', data);
        this.es.edit(data).subscribe(function (data) {
            _this.dialogRef.close(data);
            _this.bar.open("Event " + _this.event.name + " updated!", 'Updated', { duration: 3000 });
        }, function (error) {
            _this.bar.open(error.message, 'Error', { duration: 3000 });
        });
    };
    EditDialogComponent.prototype.createFormGroup = function () {
        console.log('creating form model : ', this.event);
        return new FormGroup({
            name: new FormControl(this.event.name),
            group: new FormControl(this.event.group && this.event.group.name || ''),
            description: new FormControl(this.event.description || ''),
            start_time: new FormControl(this.event.start_time || moment()),
            end_time: new FormControl(this.event.end_time || moment()),
            owner: new FormControl({
                value: 'n/a',
                disabled: true
            }),
            location: new FormControl(this.event.location || '')
        });
    };
    var _a, _b;
    __decorate([
        ViewChild("search"),
        __metadata("design:type", ElementRef)
    ], EditDialogComponent.prototype, "searchElementRef", void 0);
    __decorate([
        ViewChild(MatDatetimepicker),
        __metadata("design:type", MatDatetimepicker)
    ], EditDialogComponent.prototype, "datetimePicker", void 0);
    EditDialogComponent = __decorate([
        Component({
            selector: 'app-edit-dialog',
            templateUrl: './edit-dialog.component.html',
            styleUrls: ['./edit-dialog.component.scss'],
        }),
        __param(7, Inject(MAT_DIALOG_DATA)),
        __metadata("design:paramtypes", [MatDialogRef,
            MatSnackBar, typeof (_a = typeof EventService !== "undefined" && EventService) === "function" && _a || Object, typeof (_b = typeof GroupService !== "undefined" && GroupService) === "function" && _b || Object, MapsAPILoader,
            NgZone,
            ChangeDetectorRef, Object])
    ], EditDialogComponent);
    return EditDialogComponent;
}());
export { EditDialogComponent };
//# sourceMappingURL=edit-dialog.component.js.map