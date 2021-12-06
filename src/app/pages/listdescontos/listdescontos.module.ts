import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListdescontosPageRoutingModule } from './listdescontos-routing.module';

import { ListdescontosPage } from './listdescontos.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListdescontosPageRoutingModule
  ],
  declarations: [ListdescontosPage]
})
export class ListdescontosPageModule {}
