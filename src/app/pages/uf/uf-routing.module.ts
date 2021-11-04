import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UfPage } from './uf.page';

const routes: Routes = [
  {
    path: '',
    component: UfPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UfPageRoutingModule {}
