import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListclinicasPage } from './listclinicas.page';

const routes: Routes = [
  {
    path: '',
    component: ListclinicasPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListclinicasPageRoutingModule {}
