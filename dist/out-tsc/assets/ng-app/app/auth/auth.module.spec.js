import { AuthModule } from './auth.module';
describe('AuthModule', function () {
    var authModule;
    beforeEach(function () {
        authModule = new AuthModule();
    });
    it('should create an instance', function () {
        expect(authModule).toBeTruthy();
    });
});
//# sourceMappingURL=auth.module.spec.js.map