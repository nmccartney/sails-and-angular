import { TestBed } from '@angular/core/testing';

import { UserCurrentService } from './user-current.service';

describe('UserCurrentService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UserCurrentService = TestBed.get(UserCurrentService);
    expect(service).toBeTruthy();
  });
});
