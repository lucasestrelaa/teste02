import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EspecialidadeclinicaPage } from './especialidadeclinica.page';

const routes: Routes = [
  {
    path: '',
    component: EspecialidadeclinicaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EspecialidadeclinicaPageRoutingModule {}
