import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListufsPage } from './listufs.page';

const routes: Routes = [
  {
    path: '',
    component: ListufsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListufsPageRoutingModule {}
