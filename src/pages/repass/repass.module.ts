import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RepassPage } from './repass';

@NgModule({
  declarations: [
    RepassPage,
  ],
  imports: [
    IonicPageModule.forChild(RepassPage),
  ],
  exports: [
    RepassPage
  ]
})
export class RepassPageModule {}
