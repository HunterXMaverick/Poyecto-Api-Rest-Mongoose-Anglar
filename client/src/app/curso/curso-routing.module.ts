import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CursoComponent } from './curso.component';
import { NuevoCursoComponent } from './nuevo-curso/nuevo-curso.component';
import { EditarCursoComponent } from './editar-curso/editar-curso.component';

const routes: Routes = [
  {
    path: '',
    component: CursoComponent,
  },
  {
    path: 'create',
    component: NuevoCursoComponent,
  },
  {
    path: 'edit',
    component: EditarCursoComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})

export class CursosRoutingModule {}