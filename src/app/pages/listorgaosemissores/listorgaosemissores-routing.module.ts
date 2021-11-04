import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListorgaosemissoresPage } from './listorgaosemissores.page';

const routes: Routes = [
  {
    path: '',
    component: ListorgaosemissoresPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListorgaosemissoresPageRoutingModule {}
