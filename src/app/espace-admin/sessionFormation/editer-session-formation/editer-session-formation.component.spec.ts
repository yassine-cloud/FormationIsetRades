import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditerSessionFormationComponent } from './editer-session-formation.component';

describe('EditerSessionFormationComponent', () => {
  let component: EditerSessionFormationComponent;
  let fixture: ComponentFixture<EditerSessionFormationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditerSessionFormationComponent]
    });
    fixture = TestBed.createComponent(EditerSessionFormationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
