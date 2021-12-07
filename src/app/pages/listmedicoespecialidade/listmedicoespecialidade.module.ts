import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListmedicoespecialidadePageRoutingModule } from './listmedicoespecialidade-routing.module';

import { ListmedicoespecialidadePage } from './listmedicoespecialidade.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListmedicoespecialidadePageRoutingModule
  ],
  declarations: [ListmedicoespecialidadePage]
})
export class ListmedicoespecialidadePageModule {}
