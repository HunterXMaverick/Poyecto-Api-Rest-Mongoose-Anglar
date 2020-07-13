import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RolesComponent } from './roles.component';
import { NuevoRolComponent } from './nuevo-rol/nuevo-rol.component';
import { EditarRolComponent } from './editar-rol/editar-rol.component';

const routes: Routes = [
  {
    path: '',
    component: RolesComponent,
  },
  {
    path: 'create',
    component: NuevoRolComponent,
  },
  {
    path: 'edit',
    component: EditarRolComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RolesRoutingModule {}