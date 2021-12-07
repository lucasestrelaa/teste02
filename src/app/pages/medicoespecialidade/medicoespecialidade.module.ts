import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MedicoespecialidadePageRoutingModule } from './medicoespecialidade-routing.module';

import { MedicoespecialidadePage } from './medicoespecialidade.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MedicoespecialidadePageRoutingModule
  ],
  declarations: [MedicoespecialidadePage]
})
export class MedicoespecialidadePageModule {}
