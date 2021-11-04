import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListmedicosPageRoutingModule } from './listmedicos-routing.module';

import { ListmedicosPage } from './listmedicos.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListmedicosPageRoutingModule
  ],
  declarations: [ListmedicosPage]
})
export class ListmedicosPageModule {}
