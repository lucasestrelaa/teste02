import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OrgaoemissorPage } from './orgaoemissor.page';

const routes: Routes = [
  {
    path: '',
    component: OrgaoemissorPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrgaoemissorPageRoutingModule {}
