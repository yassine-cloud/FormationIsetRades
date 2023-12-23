import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AfficherFormationDemandeComponent } from './afficher-formation-demande.component';

describe('AfficherFormationDemandeComponent', () => {
  let component: AfficherFormationDemandeComponent;
  let fixture: ComponentFixture<AfficherFormationDemandeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AfficherFormationDemandeComponent]
    });
    fixture = TestBed.createComponent(AfficherFormationDemandeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
