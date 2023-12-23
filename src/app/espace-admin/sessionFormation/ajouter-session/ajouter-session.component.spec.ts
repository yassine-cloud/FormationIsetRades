import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjouterSessionComponent } from './ajouter-session.component';

describe('AjouterSessionComponent', () => {
  let component: AjouterSessionComponent;
  let fixture: ComponentFixture<AjouterSessionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AjouterSessionComponent]
    });
    fixture = TestBed.createComponent(AjouterSessionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
