import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListmedicosPage } from './listmedicos.page';

const routes: Routes = [
  {
    path: '',
    component: ListmedicosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListmedicosPageRoutingModule {}
