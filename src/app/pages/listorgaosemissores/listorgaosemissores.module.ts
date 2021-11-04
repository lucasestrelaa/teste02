import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListorgaosemissoresPageRoutingModule } from './listorgaosemissores-routing.module';

import { ListorgaosemissoresPage } from './listorgaosemissores.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListorgaosemissoresPageRoutingModule
  ],
  declarations: [ListorgaosemissoresPage]
})
export class ListorgaosemissoresPageModule {}
