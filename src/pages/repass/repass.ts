import {Component} from '@angular/core';
import {IonicPage, NavController} from 'ionic-angular';
import {AuthService} from "../../providers/auth-service";
import {ToastController} from 'ionic-angular';
import {Login} from "../login/login";

@IonicPage()
@Component({
  selector: 'page-repass',
  templateUrl: 'repass.html',
})
export class RepassPage {
  resposeData : any;
  tmpBSK : any;
  userData = { "email":""};

constructor(public navCtrl : NavController, public authService : AuthService,public toastCtrl: ToastController) {}
  ionViewDidLoad() {
    console.log('ionViewDidLoad RepassPage');
  }
alerta(mensaje: any) {
      let toast = this.toastCtrl.create({
        message: mensaje,
        duration: 10000,
        closeButtonText: 'Ok'
      });
      toast.present();
    }
  recupera() {
    if(this.userData.email){
      this.authService.postData(this.userData, "recupera").then((result) =>{
      this.resposeData = result;
     	 console.log(this.resposeData);
        this.alerta(this.resposeData.mensaje);
    }, (err) => {
      this.alerta("Ocurrio un error de conexión, por favor verifica tu conexión a internet");
    });
  }
  else {
    this.alerta("Por favor ingresa datos válidos");
    console.log("Give valid information.");
  }
  
 }

 login(){ this.navCtrl.push(Login); }

}
 