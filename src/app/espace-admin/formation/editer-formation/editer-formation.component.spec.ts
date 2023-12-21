import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditerFormationComponent } from './editer-formation.component';

describe('EditerFormationComponent', () => {
  let component: EditerFormationComponent;
  let fixture: ComponentFixture<EditerFormationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditerFormationComponent]
    });
    fixture = TestBed.createComponent(EditerFormationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
