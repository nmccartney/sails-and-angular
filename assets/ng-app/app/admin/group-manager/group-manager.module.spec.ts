import { GroupManagerModule } from './group-manager.module';

describe('ManagerModule', () => {
  let managerModule: GroupManagerModule;

  beforeEach(() => {
    managerModule = new GroupManagerModule();
  });

  it('should create an instance', () => {
    expect(managerModule).toBeTruthy();
  });
});
