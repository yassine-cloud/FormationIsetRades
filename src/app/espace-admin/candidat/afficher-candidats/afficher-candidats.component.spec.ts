import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AfficherCandidatsComponent } from './afficher-candidats.component';

describe('AfficherCandidatsComponent', () => {
  let component: AfficherCandidatsComponent;
  let fixture: ComponentFixture<AfficherCandidatsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AfficherCandidatsComponent]
    });
    fixture = TestBed.createComponent(AfficherCandidatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
