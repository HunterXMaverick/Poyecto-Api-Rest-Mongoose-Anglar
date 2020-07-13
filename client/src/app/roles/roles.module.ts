import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { RolesRoutingModule } from './roles-routing.module';
import { NuevoRolComponent } from './nuevo-rol/nuevo-rol.component';
import { EditarRolComponent } from './editar-rol/editar-rol.component';

@NgModule({
  declarations: [NuevoRolComponent, EditarRolComponent],
  imports: [CommonModule, RolesRoutingModule, FormsModule, ReactiveFormsModule],
})
export class RolesModule {}