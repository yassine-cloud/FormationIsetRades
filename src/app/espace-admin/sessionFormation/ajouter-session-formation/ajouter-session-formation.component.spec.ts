import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjouterSessionFormationComponent } from './ajouter-session-formation.component';

describe('AjouterSessionFormationComponent', () => {
  let component: AjouterSessionFormationComponent;
  let fixture: ComponentFixture<AjouterSessionFormationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AjouterSessionFormationComponent]
    });
    fixture = TestBed.createComponent(AjouterSessionFormationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
