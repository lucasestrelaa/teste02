import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DescontosPageRoutingModule } from './descontos-routing.module';

import { DescontosPage } from './descontos.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DescontosPageRoutingModule
  ],
  declarations: [DescontosPage]
})
export class DescontosPageModule {}
