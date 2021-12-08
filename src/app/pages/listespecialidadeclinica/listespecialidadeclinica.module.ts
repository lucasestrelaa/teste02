import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListespecialidadeclinicaPageRoutingModule } from './listespecialidadeclinica-routing.module';

import { ListespecialidadeclinicaPage } from './listespecialidadeclinica.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListespecialidadeclinicaPageRoutingModule
  ],
  declarations: [ListespecialidadeclinicaPage]
})
export class ListespecialidadeclinicaPageModule {}
