import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContainerComponent } from './container/container.component';
import { MesFormationsComponent } from './mes-formations/mes-formations.component';

const routes: Routes = [
  {path : '' , component : ContainerComponent ,
  children : [
    {path : 'mesFormations' , component : MesFormationsComponent},
    
    // other
    {path : '**' , redirectTo : '/public/acceuil' , pathMatch : 'full' }
  ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EspacePriveFRoutingModule { }
