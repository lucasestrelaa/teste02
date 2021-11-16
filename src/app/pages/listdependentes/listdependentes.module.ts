import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListdependentesPageRoutingModule } from './listdependentes-routing.module';

import { ListdependentesPage } from './listdependentes.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListdependentesPageRoutingModule
  ],
  declarations: [ListdependentesPage]
})
export class ListdependentesPageModule {}
