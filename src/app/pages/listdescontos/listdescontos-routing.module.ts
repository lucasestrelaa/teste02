import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListdescontosPage } from './listdescontos.page';

const routes: Routes = [
  {
    path: '',
    component: ListdescontosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListdescontosPageRoutingModule {}
