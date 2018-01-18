import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';

import { Login } from '../login/login';
import { Signup } from '../signup/signup';
import { TabsPage } from '../tabs/tabs';
/**
 * Generated class for the Welcome page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

export interface Slide {
  title: string;
  description: string;
  image: string;
}

@IonicPage()
@Component({
  selector: 'page-welcome',
  templateUrl: 'welcome.html',
})
export class Welcome {
  slides: Slide[];
  showSkip = true;
  constructor(public navCtrl: NavController, public navParams: NavParams, public platform: Platform) {
   
   if(localStorage.getItem('userData')){
     this.navCtrl.setRoot(TabsPage);
   }

   this.slides = [{
            title: "Dieta Positiva",
            description: "Es una aplicación que te ayudará a crear una dieta dirigida estrictamente a tus necesidades y objetivos, sustentada y realizada por nutriólogos especialistas en el control de peso.",
            image: 'assets/imgs/welcome/1.png',
          }, {
            title: "No pierdas más",
            description: " El tiempo con dietas sin supervisión de un nutriólogo profesional.",
            image: 'assets/imgs/welcome/2.png',
          },{
            title: "Consigue tu objetivo",
            description: "Personal sin gastar tanto dinero y desde la palma de tu mano.",
            image: 'assets/imgs/welcome/3.png',
          },{
            title: "Con App Dieta Positiva",
            description: "Tienes la posibilidad de reforzar tu dieta hecha por tu nutriólogo de confianza, o te mostramos un directorio para que elijas y conozcas a tu nuevo especialista en nutrición.",
            image: 'assets/imgs/welcome/4.png',
          },{
            title: "Mantén comunicación",
            description: "Constante con tu nutriólogo para modificar tu dieta si es necesario.",
            image: 'assets/imgs/welcome/5.png',
          },{
            title: "Aplicación interactiva",
            description: "Que mantendrá tu motivación y compromiso para  lograr tu objetivo en un tiempo específico.",
           image: 'assets/imgs/welcome/6.png',
          },{
            title: "Comparte tu objetivo",
            description: "Diariamente en Facebook y Twitter y mantén contacto con nuestros miles de usuarios, y al mismo tiempo conviértete en un ejemplo para tus amigos, y motívalos a comenzar su dieta.",
            image: 'assets/imgs/welcome/7.png',
          }
        ];

  }
   onSlideChangeStart(slider) {
    this.showSkip = !slider.isEnd();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Welcome');
  }

  login(){
   this.navCtrl.push(Login);
  }

  signup(){
   this.navCtrl.push(Signup, {}, {animate:false});
  }

}
