import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AfficherSessionFormationComponent } from './afficher-session-formation.component';

describe('AfficherSessionFormationComponent', () => {
  let component: AfficherSessionFormationComponent;
  let fixture: ComponentFixture<AfficherSessionFormationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AfficherSessionFormationComponent]
    });
    fixture = TestBed.createComponent(AfficherSessionFormationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
