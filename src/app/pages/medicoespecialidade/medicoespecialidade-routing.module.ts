import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MedicoespecialidadePage } from './medicoespecialidade.page';

const routes: Routes = [
  {
    path: '',
    component: MedicoespecialidadePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MedicoespecialidadePageRoutingModule {}
