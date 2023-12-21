import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { formateurGuard } from './formateur.guard';

describe('formateurGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => formateurGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
