import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListespecialidadesPageRoutingModule } from './listespecialidades-routing.module';

import { ListespecialidadesPage } from './listespecialidades.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListespecialidadesPageRoutingModule
  ],
  declarations: [ListespecialidadesPage]
})
export class ListespecialidadesPageModule {}
