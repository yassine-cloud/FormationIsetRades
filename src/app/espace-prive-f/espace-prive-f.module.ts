import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EspacePriveFRoutingModule } from './espace-prive-f-routing.module';
import { NavbarFormateurComponent } from './navbar-formateur/navbar-formateur.component';
import { MesFormationsComponent } from './mes-formations/mes-formations.component';
import { ContainerComponent } from './container/container.component';


@NgModule({
  declarations: [
    MesFormationsComponent,
    ContainerComponent
  ],
  imports: [
    CommonModule,
    EspacePriveFRoutingModule
  ]
})
export class EspacePriveFModule { }
