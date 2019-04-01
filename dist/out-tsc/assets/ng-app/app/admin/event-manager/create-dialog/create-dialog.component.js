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
import { Component, NgZone, ElementRef, ViewChild, Inject } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatDialogRef, MatSnackBar, MAT_DIALOG_DATA } from '@angular/material';
// import { EventService } from '../../event.service';
import { UserService } from 'ng-app/app/user/user.service';
import { EventService } from 'ng-app/app/event/event.service';
import { MapsAPILoader } from '@agm/core';
var CreateDialogComponent = /** @class */ (function () {
    function CreateDialogComponent(dialogRef, data, es, bar, us, mapsAPILoader, ngZone) {
        this.dialogRef = dialogRef;
        this.data = data;
        this.es = es;
        this.bar = bar;
        this.us = us;
        this.mapsAPILoader = mapsAPILoader;
        this.ngZone = ngZone;
        this.latitude = 40.4406248;
        this.longitude = -79.9958864;
        this.event = {};
        var user = this.us.findMe() || '';
        this.owner = JSON.parse(user);
        console.log(dialogRef);
        this.eventForm = this.createFormGroup();
    }
    CreateDialogComponent.prototype.ngOnInit = function () {
        var _this = this;
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
                    _this.event['place_id'] = place.place_id;
                    _this.event['gps'] = { lat: _this.latitude, lng: _this.longitude };
                    var placeValue = _this.searchElementRef.nativeElement.value;
                    _this.eventForm.controls.location.setValue(placeValue);
                });
            });
        });
    };
    CreateDialogComponent.prototype.createFormGroup = function () {
        return new FormGroup({
            name: new FormControl(),
            owner: new FormControl({
                value: this.owner.username,
                disabled: true
            }),
            group: new FormControl(this.data && this.data.group && this.data.group.name || ''),
            description: new FormControl(''),
            start_time: new FormControl(moment()),
            end_time: new FormControl(moment().add(1, 'hours')),
            location: new FormControl('')
        });
    };
    CreateDialogComponent.prototype.submit = function () {
        var _this = this;
        var data = __assign({}, this.event, this.eventForm.value, { owner: this.owner & this.owner.id || null, group: this.data && this.data.group && this.data.group.id || null });
        console.log('creating event ', data);
        this.es.create(data).subscribe(function (data) {
            _this.dialogRef.close(data);
        }, function (error) {
            // console.log('create event failed : ', error);
            _this.bar.open(error.message, 'Error', { duration: 3000 });
        });
    };
    var _a, _b;
    __decorate([
        ViewChild("search"),
        __metadata("design:type", ElementRef)
    ], CreateDialogComponent.prototype, "searchElementRef", void 0);
    CreateDialogComponent = __decorate([
        Component({
            selector: 'app-create-dialog',
            templateUrl: './create-dialog.component.html',
            styleUrls: ['./create-dialog.component.scss']
        }),
        __param(1, Inject(MAT_DIALOG_DATA)),
        __metadata("design:paramtypes", [MatDialogRef, Object, typeof (_a = typeof EventService !== "undefined" && EventService) === "function" && _a || Object, MatSnackBar, typeof (_b = typeof UserService !== "undefined" && UserService) === "function" && _b || Object, MapsAPILoader,
            NgZone])
    ], CreateDialogComponent);
    return CreateDialogComponent;
}());
export { CreateDialogComponent };
//# sourceMappingURL=create-dialog.component.js.map