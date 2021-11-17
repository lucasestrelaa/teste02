import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListconsultasPage } from './listconsultas.page';

const routes: Routes = [
  {
    path: '',
    component: ListconsultasPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListconsultasPageRoutingModule {}
