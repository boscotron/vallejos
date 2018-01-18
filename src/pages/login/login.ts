import { Component } from '@angular/core';
import { IonicPage, NavController, MenuController, ToastController } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';
import {AuthService} from "../../providers/auth-service";
import {jmyapis} from "../../providers/jmyapis";
import {Signup} from "../signup/signup";
import {RepassPage} from "../repass/repass";

/**
 * Generated class for the Login page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class Login {
  
  resposeData : any;
  userData = {"username":"", 
              "password":"",
              "apis":{},
            };

  constructor(public navCtrl: NavController, public jmyApis: jmyapis, public authService: AuthService, private toastCtrl:ToastController, public menu: MenuController) {

    var data = JSON.parse(localStorage.getItem('tmpData'));
    if(data!=undefined){
      this.userData.username = data.username;
    }
    console.log(data); //data.username
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Login');
  }
 
  login(){
    if(this.userData.username && this.userData.password){
      this.userData.apis = this.jmyApis.hostApisList;
      this.authService.postData(this.userData, "login").then((result) =>{
      this.resposeData = result;
      console.log(this.resposeData);
      console.log(this.jmyApis.hostApisList);
      if(this.resposeData.userData){
        localStorage.setItem('userData', JSON.stringify(this.resposeData) ); 
        localStorage.setItem('jmyData', JSON.stringify(this.resposeData.jmyapi) );
        localStorage.setItem('userDataSend', JSON.stringify(this.userData) );
        this.navCtrl.push(TabsPage);
        this.menu.enable(true);
        this.presentToast("Cargando...");
        location.reload();
      }else{
        this.presentToast("El usuario o contraseña no es valido");
     }}, (err) => {
        this.presentToast("Ocurrio un error de conexión, por favor verifica tu conexión a internet");
      });
     }else{
      this.presentToast("Se requiere de un usuario y contraseña");
     }
  }


  presentToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 6000
    });
    toast.present();
  }

   repass() {
    this
      .navCtrl
      .push(RepassPage);
  }
   signup() {
    this
      .navCtrl
      .push(Signup);
  }

}
