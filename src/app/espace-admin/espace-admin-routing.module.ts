import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AfficherCandidatsComponent } from './candidat/afficher-candidats/afficher-candidats.component';
import { ContainerComponent } from './container/container.component';
import { AfficherFormationComponent } from './formation/afficher-formation/afficher-formation.component';
import { AfficherSessionFormationComponent } from './sessionFormation/afficher-session-formation/afficher-session-formation.component';
import { AfficherFormateurComponent } from './formateur/afficher-formateur/afficher-formateur.component';
import { AjouterFormationComponent } from './formation/ajouter-formation/ajouter-formation.component';
import { EditerFormationComponent } from './formation/editer-formation/editer-formation.component';
import { AjouterSessionFormationComponent } from './sessionFormation/ajouter-session-formation/ajouter-session-formation.component';
import { EditerSessionFormationComponent } from './sessionFormation/editer-session-formation/editer-session-formation.component';
import { AjouterFormateurComponent } from './formateur/ajouter-formateur/ajouter-formateur.component';
import { EditerFormateurComponent } from './formateur/editer-formateur/editer-formateur.component';
import { AjouterCandidatComponent } from './candidat/ajouter-candidat/ajouter-candidat.component';
import { EditerCandidatComponent } from './candidat/editer-candidat/editer-candidat.component';

const routes: Routes = [
  {path : '' , component : ContainerComponent,
  children : [

    // formation
    {path : 'afficher-formations' , component : AfficherFormationComponent},
    {path : 'ajouter-formation' , component : AjouterFormationComponent},
    {path : 'editer-formation/:id' , component : EditerFormationComponent},


    // session
    {path : 'afficher-sessions' , component : AfficherSessionFormationComponent},
    {path : 'ajouter-session' , component : AjouterSessionFormationComponent},
    {path : 'editer-session/:id' , component : EditerSessionFormationComponent},


    //formateur 
    {path : 'afficher-formateurs' , component : AfficherFormateurComponent},
    {path : 'ajouter-formateur' , component : AjouterFormateurComponent},
    {path : 'editer-formateur/:id' , component : EditerFormateurComponent},


    // candidat
    {path : 'afficher-candidats' , component : AfficherCandidatsComponent},
    {path : 'ajouter-candidat' , component : AjouterCandidatComponent},
    {path : 'editer-candidat/:id' , component : EditerCandidatComponent},

    // other
    {path : '**' , redirectTo : '/public/acceuil' , pathMatch : 'full' }
  ]
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EspaceAdminRoutingModule { }
