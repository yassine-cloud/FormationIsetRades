import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarFormateurComponent } from './navbar-formateur.component';

describe('NavbarFormateurComponent', () => {
  let component: NavbarFormateurComponent;
  let fixture: ComponentFixture<NavbarFormateurComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NavbarFormateurComponent]
    });
    fixture = TestBed.createComponent(NavbarFormateurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
