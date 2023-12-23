import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { FooterPublicComponent } from './espace-public/footer-public/footer-public.component';
import { ContainerComponent } from './espace-public/container/container.component';
import { NavbarPublicComponent } from './espace-public/navbar-public/navbar-public.component';
import { AcceuilComponent } from './espace-public/acceuil/acceuil.component';
import { FormationsComponent } from './espace-public/formations/formations.component';
import { DetailFormationComponent } from './espace-public/detail-formation/detail-formation.component';
import { SignUpComponent } from './espace-public/sign-up/sign-up.component';
import { NavbarAdminComponent } from './espace-admin/navbar-admin/navbar-admin.component';
import { NavbarCandidatComponent } from './espace-prive-c/navbar-candidat/navbar-candidat.component';
import { NavbarFormateurComponent } from './espace-prive-f/navbar-formateur/navbar-formateur.component';
import { DatePipe } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    FooterPublicComponent,
    NavbarPublicComponent,
    ContainerComponent,
    AcceuilComponent,
    FormationsComponent,
    DetailFormationComponent,
    SignUpComponent,
    // navbar
    NavbarAdminComponent,
    NavbarCandidatComponent,
    NavbarFormateurComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
