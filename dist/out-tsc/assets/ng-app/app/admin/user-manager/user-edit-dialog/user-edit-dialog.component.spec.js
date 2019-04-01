import { async, TestBed } from '@angular/core/testing';
import { UserEditDialogComponent } from './user-edit-dialog.component';
describe('UserEditDialogComponent', function () {
    var component;
    var fixture;
    beforeEach(async(function () {
        TestBed.configureTestingModule({
            declarations: [UserEditDialogComponent]
        })
            .compileComponents();
    }));
    beforeEach(function () {
        fixture = TestBed.createComponent(UserEditDialogComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', function () {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=user-edit-dialog.component.spec.js.map