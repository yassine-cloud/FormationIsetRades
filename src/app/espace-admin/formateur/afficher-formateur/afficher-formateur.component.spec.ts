import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AfficherFormateurComponent } from './afficher-formateur.component';

describe('AfficherFormateurComponent', () => {
  let component: AfficherFormateurComponent;
  let fixture: ComponentFixture<AfficherFormateurComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AfficherFormateurComponent]
    });
    fixture = TestBed.createComponent(AfficherFormateurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
