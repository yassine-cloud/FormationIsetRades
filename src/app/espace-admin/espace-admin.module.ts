import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { EspaceAdminRoutingModule } from './espace-admin-routing.module';
import { AfficherCandidatsComponent } from './candidat/afficher-candidats/afficher-candidats.component';
import { ContainerComponent } from './container/container.component';
import { AfficherFormateurComponent } from './formateur/afficher-formateur/afficher-formateur.component';
import { AfficherFormationComponent } from './formation/afficher-formation/afficher-formation.component';
import { AfficherSessionFormationComponent } from './sessionFormation/afficher-session-formation/afficher-session-formation.component';
import { AjouterCandidatComponent } from './candidat/ajouter-candidat/ajouter-candidat.component';
import { EditerCandidatComponent } from './candidat/editer-candidat/editer-candidat.component';
import { AjouterFormateurComponent } from './formateur/ajouter-formateur/ajouter-formateur.component';
import { EditerFormateurComponent } from './formateur/editer-formateur/editer-formateur.component';
import { EditerFormationComponent } from './formation/editer-formation/editer-formation.component';
import { AjouterFormationComponent } from './formation/ajouter-formation/ajouter-formation.component';
import { EditerSessionFormationComponent } from './sessionFormation/editer-session-formation/editer-session-formation.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AfficherFormationDemandeComponent } from './formation-demande/afficher-formation-demande/afficher-formation-demande.component';
import { AjouterSessionComponent } from './sessionFormation/ajouter-session/ajouter-session.component';


@NgModule({
  declarations: [
    AfficherCandidatsComponent,
    ContainerComponent,
    AfficherFormateurComponent,
    AfficherFormationComponent,
    AfficherSessionFormationComponent,
    AjouterCandidatComponent,
    EditerCandidatComponent,
    AjouterFormateurComponent,
    EditerFormateurComponent,
    EditerFormationComponent,
    AjouterFormationComponent,
    EditerSessionFormationComponent,
    AfficherFormationDemandeComponent,
    AjouterSessionComponent
  ],
  imports: [
    CommonModule,
    EspaceAdminRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    DatePipe
  ]
})
export class EspaceAdminModule { }
