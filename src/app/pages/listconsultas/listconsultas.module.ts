import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListconsultasPageRoutingModule } from './listconsultas-routing.module';

import { ListconsultasPage } from './listconsultas.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListconsultasPageRoutingModule
  ],
  declarations: [ListconsultasPage]
})
export class ListconsultasPageModule {}
