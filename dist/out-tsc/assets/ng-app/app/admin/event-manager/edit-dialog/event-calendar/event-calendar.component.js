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
import { Component, ViewChild, TemplateRef, HostBinding, Input, Output, EventEmitter } from '@angular/core';
import { CalendarView } from 'angular-calendar';
import { Subject } from 'rxjs';
import { startOfDay, endOfDay, isSameDay, isSameMonth } from 'date-fns';
import { MatDialog } from '@angular/material';
import { CreateDialogComponent } from '../../create-dialog/create-dialog.component';
var colors = {
    red: {
        primary: '#ad2121',
        secondary: '#FAE3E3'
    },
    blue: {
        primary: '#1e90ff',
        secondary: '#D1E8FF'
    },
    yellow: {
        primary: '#e3bc08',
        secondary: '#FDF1BA'
    }
};
var EventCalendarComponent = /** @class */ (function () {
    function EventCalendarComponent(dialog) {
        var _this = this;
        this.dialog = dialog;
        this._eventClass = true;
        this.onSelection = new EventEmitter();
        this.view = CalendarView.Month;
        this.CalendarView = CalendarView;
        this.viewDate = new Date();
        this.actions = [
            {
                label: "<i class=\"fa fa-fw fa-pencil\"></i>",
                onClick: function (_a) {
                    var event = _a.event;
                    _this.handleEvent('Edited', event);
                    _this.onSelection.emit(event);
                }
            },
        ];
        this.refresh = new Subject();
        this.activeDayIsOpen = true;
    }
    Object.defineProperty(EventCalendarComponent.prototype, "events", {
        get: function () { return this._events; },
        set: function (value) {
            var _this = this;
            console.log('--', value);
            if (!value) {
                return;
            }
            var newEvents = value.map(function (event) {
                return __assign({}, event, { start: new Date(event.start_time), end: new Date(event.end_time), title: event.name, color: colors.red, actions: _this.actions, allDay: false, resizable: {
                        beforeStart: true,
                        afterEnd: true
                    }, draggable: true });
            });
            console.log(newEvents);
            this._events = newEvents;
        },
        enumerable: true,
        configurable: true
    });
    EventCalendarComponent.prototype.ngOnInit = function () {
    };
    EventCalendarComponent.prototype.createEvent = function () {
        var createDialogRef = this.dialog.open(CreateDialogComponent, {
            height: '75%',
            width: '75%',
            data: {
                // group:this.even
                group: this.group
            }
        });
        createDialogRef.afterClosed().subscribe(function (result) {
            console.log('The dialog was closed');
            // this.setEvents();
        });
    };
    EventCalendarComponent.prototype.dayClicked = function (_a) {
        var date = _a.date, events = _a.events;
        if (isSameMonth(date, this.viewDate)) {
            this.viewDate = date;
            if ((isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
                events.length === 0) {
                this.activeDayIsOpen = false;
            }
            else {
                this.activeDayIsOpen = true;
            }
        }
    };
    EventCalendarComponent.prototype.eventTimesChanged = function (_a) {
        var event = _a.event, newStart = _a.newStart, newEnd = _a.newEnd;
        event.start = newStart;
        event.end = newEnd;
        this.handleEvent('Dropped or resized', event);
        this.refresh.next();
    };
    EventCalendarComponent.prototype.handleEvent = function (action, event) {
        // this.onSelection.emit(event);
        // this.modalData = { event, action };
        // this.modal.open(this.modalContent, { size: 'lg' });
    };
    EventCalendarComponent.prototype.addEvent = function () {
        this.events.push({
            title: 'New event',
            start: startOfDay(new Date()),
            end: endOfDay(new Date()),
            color: colors.red,
            draggable: true,
            resizable: {
                beforeStart: true,
                afterEnd: true
            }
        });
        this.refresh.next();
    };
    __decorate([
        ViewChild('modalContent'),
        __metadata("design:type", TemplateRef)
    ], EventCalendarComponent.prototype, "modalContent", void 0);
    __decorate([
        HostBinding('class.event-calendar'),
        __metadata("design:type", Object)
    ], EventCalendarComponent.prototype, "_eventClass", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], EventCalendarComponent.prototype, "group", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [Object])
    ], EventCalendarComponent.prototype, "events", null);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], EventCalendarComponent.prototype, "onSelection", void 0);
    EventCalendarComponent = __decorate([
        Component({
            selector: 'event-calendar',
            templateUrl: './event-calendar.component.html',
            styleUrls: ['./event-calendar.component.scss']
        }),
        __metadata("design:paramtypes", [MatDialog])
    ], EventCalendarComponent);
    return EventCalendarComponent;
}());
export { EventCalendarComponent };
//# sourceMappingURL=event-calendar.component.js.map