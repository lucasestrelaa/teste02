import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OrgaoemissorPageRoutingModule } from './orgaoemissor-routing.module';

import { OrgaoemissorPage } from './orgaoemissor.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OrgaoemissorPageRoutingModule
  ],
  declarations: [OrgaoemissorPage]
})
export class OrgaoemissorPageModule {}
