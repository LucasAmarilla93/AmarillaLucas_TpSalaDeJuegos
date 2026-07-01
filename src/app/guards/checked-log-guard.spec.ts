import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { checkedLogGuard } from './checked-log-guard';

describe('checkedLogGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) =>
    TestBed.runInInjectionContext(() => checkedLogGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
