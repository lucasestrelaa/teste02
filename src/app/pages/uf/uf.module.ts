import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UfPageRoutingModule } from './uf-routing.module';

import { UfPage } from './uf.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UfPageRoutingModule
  ],
  declarations: [UfPage]
})
export class UfPageModule {}
