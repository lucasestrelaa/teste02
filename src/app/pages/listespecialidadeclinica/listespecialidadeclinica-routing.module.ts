import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListespecialidadeclinicaPage } from './listespecialidadeclinica.page';

const routes: Routes = [
  {
    path: '',
    component: ListespecialidadeclinicaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListespecialidadeclinicaPageRoutingModule {}
