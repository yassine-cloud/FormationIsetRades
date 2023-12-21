import { TestBed } from '@angular/core/testing';

import { FormationDemandeService } from './formation-demande.service';

describe('FormationDemandeService', () => {
  let service: FormationDemandeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FormationDemandeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
