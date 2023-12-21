import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContainerComponent } from './espace-public/container/container.component';
import { AcceuilComponent } from './espace-public/acceuil/acceuil.component';
import { FormationsComponent } from './espace-public/formations/formations.component';
import { DetailFormationComponent } from './espace-public/detail-formation/detail-formation.component';
import { SignUpComponent } from './espace-public/sign-up/sign-up.component';

const routes: Routes = [
  {path : 'public' , component : ContainerComponent , 
  children:[
    {path : 'acceuil' , component : AcceuilComponent},
    {path : 'formations' , component : FormationsComponent},
    {path : 'detail' , component : DetailFormationComponent},
    {path : 'sign-up' , component : SignUpComponent}
  ]},
  {path : 'candidat' , loadChildren : 
                      () => import("./espace-prive-c/espace-prive-c.module")
                      .then(m=>m.EspacePriveCModule) },
  {path : 'formateur' , loadChildren :
                      () => import("./espace-prive-f/espace-prive-f.module")
                      .then(m=>m.EspacePriveFModule)},
  {path : 'admin' , loadChildren :
                      () => import("./espace-admin/espace-admin.module")
                      .then(m=>m.EspaceAdminModule) },
  {path : '**' , redirectTo : '/public/acceuil' , pathMatch : 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
