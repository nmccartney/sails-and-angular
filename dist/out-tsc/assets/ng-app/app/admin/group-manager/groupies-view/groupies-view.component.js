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
var GroupiesViewComponent = /** @class */ (function () {
    function GroupiesViewComponent() {
        this.latitude = 40.4406248;
        this.longitude = -79.9958864;
        this.zoom = 15;
    }
    GroupiesViewComponent.prototype.ngOnInit = function () {
    };
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], GroupiesViewComponent.prototype, "groupies", void 0);
    GroupiesViewComponent = __decorate([
        Component({
            selector: 'app-groupies-view',
            templateUrl: './groupies-view.component.html',
            styleUrls: ['./groupies-view.component.scss']
        }),
        __metadata("design:paramtypes", [])
    ], GroupiesViewComponent);
    return GroupiesViewComponent;
}());
export { GroupiesViewComponent };
//# sourceMappingURL=groupies-view.component.js.map