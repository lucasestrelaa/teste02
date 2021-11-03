import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MedicoslistPageRoutingModule } from './medicoslist-routing.module';

import { MedicoslistPage } from './medicoslist.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MedicoslistPageRoutingModule
  ],
  declarations: [MedicoslistPage]
})
export class MedicoslistPageModule {}
