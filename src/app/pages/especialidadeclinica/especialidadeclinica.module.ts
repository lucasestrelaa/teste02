import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EspecialidadeclinicaPageRoutingModule } from './especialidadeclinica-routing.module';

import { EspecialidadeclinicaPage } from './especialidadeclinica.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EspecialidadeclinicaPageRoutingModule
  ],
  declarations: [EspecialidadeclinicaPage]
})
export class EspecialidadeclinicaPageModule {}
