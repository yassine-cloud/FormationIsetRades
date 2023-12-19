import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContainerComponent } from './espace-public/container/container.component';
import { AcceuilComponent } from './espace-public/acceuil/acceuil.component';
import { FormationsComponent } from './espace-public/formations/formations.component';
import { DetailFormationComponent } from './espace-public/detail-formation/detail-formation.component';

const routes: Routes = [
  {path : 'public' , component : ContainerComponent , 
  children:[
    {path : 'acceuil' , component : AcceuilComponent},
    {path : 'formations' , component : FormationsComponent},
    {path : 'detail' , component : DetailFormationComponent}
  ]},
  // {path : 'candidat'},
  // {path : 'formateur'},
  // {path : 'admin'},
  {path : '**' , redirectTo : '/public/acceuil' , pathMatch : 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
