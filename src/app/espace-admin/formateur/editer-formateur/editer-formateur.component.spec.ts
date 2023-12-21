import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditerFormateurComponent } from './editer-formateur.component';

describe('EditerFormateurComponent', () => {
  let component: EditerFormateurComponent;
  let fixture: ComponentFixture<EditerFormateurComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditerFormateurComponent]
    });
    fixture = TestBed.createComponent(EditerFormateurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
