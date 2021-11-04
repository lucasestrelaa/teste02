import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListclinicasPageRoutingModule } from './listclinicas-routing.module';

import { ListclinicasPage } from './listclinicas.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListclinicasPageRoutingModule
  ],
  declarations: [ListclinicasPage]
})
export class ListclinicasPageModule {}
