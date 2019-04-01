import { UserManagerModule } from './user-manager.module';
describe('UserManagerModule', function () {
    var userManagerModule;
    beforeEach(function () {
        userManagerModule = new UserManagerModule();
    });
    it('should create an instance', function () {
        expect(userManagerModule).toBeTruthy();
    });
});
//# sourceMappingURL=user-manager.module.spec.js.map