import { async, TestBed } from '@angular/core/testing';
import { GroupiesViewComponent } from './groupies-view.component';
describe('GroupiesViewComponent', function () {
    var component;
    var fixture;
    beforeEach(async(function () {
        TestBed.configureTestingModule({
            declarations: [GroupiesViewComponent]
        })
            .compileComponents();
    }));
    beforeEach(function () {
        fixture = TestBed.createComponent(GroupiesViewComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', function () {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=groupies-view.component.spec.js.map