import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ConsolaPage } from './consola';

@NgModule({
  declarations: [
    ConsolaPage,
  ],
  imports: [
    IonicPageModule.forChild(ConsolaPage),
  ],
})
export class ConsolaPageModule {}
