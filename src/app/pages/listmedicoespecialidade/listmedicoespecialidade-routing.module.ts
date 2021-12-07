import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListmedicoespecialidadePage } from './listmedicoespecialidade.page';

const routes: Routes = [
  {
    path: '',
    component: ListmedicoespecialidadePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListmedicoespecialidadePageRoutingModule {}
