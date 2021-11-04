import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListufsPageRoutingModule } from './listufs-routing.module';

import { ListufsPage } from './listufs.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListufsPageRoutingModule
  ],
  declarations: [ListufsPage]
})
export class ListufsPageModule {}
