import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DescontosPage } from './descontos.page';

const routes: Routes = [
  {
    path: '',
    component: DescontosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DescontosPageRoutingModule {}
