import { Component, OnInit, TemplateRef, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConnexionService } from 'src/app/Services/connexion.service';
import { LoginService } from 'src/app/Services/login.service';

@Component({
  selector: 'app-navbar-public',
  templateUrl: './navbar-public.component.html',
  styleUrls: ['./navbar-public.component.css'],
})
export class NavbarPublicComponent implements OnInit {
  constructor(
    private formbuild: FormBuilder,
    private loginServ: LoginService,
    private router : Router,
    private conn : ConnexionService
  ) {}

  // form
  formerror = false;
  formLogin = this.formbuild.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
  });

  // pop up view
  private modalService = inject(NgbModal);

  openPopup(content: TemplateRef<any>) {
    this.modalService.open(content, { backdropClass: 'pop-up-backdrop' });
  }

  //////////////////////////////////////////////////////////////////

  ngOnInit(): void {}

  connecter() {
    this.loginServ
      .loginUser(this.formLogin.value.email!, this.formLogin.value.password!)
      .subscribe((isLoggedIn) => {
        if (isLoggedIn) {
          this.conn.controle();
          this.modalService.dismissAll("connected");
          this.formLogin.reset();
          this.formerror=false;
          this.router.navigate(["/"]);
          
        } else {
          this.formLogin.reset();
          this.formLogin.markAllAsTouched();
          this.formerror = true;
        }
      });
  }
}
