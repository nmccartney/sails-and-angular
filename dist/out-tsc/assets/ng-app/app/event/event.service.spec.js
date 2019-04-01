import { TestBed } from '@angular/core/testing';
import { EventService } from './event.service';
describe('EventService', function () {
    beforeEach(function () { return TestBed.configureTestingModule({}); });
    it('should be created', function () {
        var service = TestBed.get(EventService);
        expect(service).toBeTruthy();
    });
});
//# sourceMappingURL=event.service.spec.js.map