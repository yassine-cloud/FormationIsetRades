import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarCandidatComponent } from './navbar-candidat.component';

describe('NavbarCandidatComponent', () => {
  let component: NavbarCandidatComponent;
  let fixture: ComponentFixture<NavbarCandidatComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NavbarCandidatComponent]
    });
    fixture = TestBed.createComponent(NavbarCandidatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
