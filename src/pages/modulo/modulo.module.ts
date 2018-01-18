import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ModuloPage } from './modulo';

@NgModule({
  declarations: [
    ModuloPage,
  ],
  imports: [
    IonicPageModule.forChild(ModuloPage),
  ],
  exports: [
    ModuloPage
  ]
})
export class ModuloPageModule {}
