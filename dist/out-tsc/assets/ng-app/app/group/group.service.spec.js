import { TestBed } from '@angular/core/testing';
import { GroupService } from './group.service';
describe('GroupService', function () {
    beforeEach(function () { return TestBed.configureTestingModule({}); });
    it('should be created', function () {
        var service = TestBed.get(GroupService);
        expect(service).toBeTruthy();
    });
});
//# sourceMappingURL=group.service.spec.js.map