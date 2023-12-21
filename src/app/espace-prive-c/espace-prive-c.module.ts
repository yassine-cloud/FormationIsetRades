import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EspacePriveCRoutingModule } from './espace-prive-c-routing.module';
import { NavbarCandidatComponent } from './navbar-candidat/navbar-candidat.component';
import { ContainerComponent } from './container/container.component';
import { MesFormationsComponent } from './mes-formations/mes-formations.component';


@NgModule({
  declarations: [
    NavbarCandidatComponent,
    ContainerComponent,
    MesFormationsComponent
  ],
  imports: [
    CommonModule,
    EspacePriveCRoutingModule
  ]
})
export class EspacePriveCModule { }
