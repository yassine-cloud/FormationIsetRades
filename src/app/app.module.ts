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
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
