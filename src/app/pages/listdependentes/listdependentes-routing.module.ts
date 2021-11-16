import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListdependentesPage } from './listdependentes.page';

const routes: Routes = [
  {
    path: '',
    component: ListdependentesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListdependentesPageRoutingModule {}
