import { Injectable } from '@angular/core';
import { ToastController } from 'ionic-angular';
import { AuthService } from "../providers/auth-service";
import { Common } from "../providers/common";
import 'rxjs/add/operator/map';

@Injectable()
export class jmyfatkit {
  public uD : any;
  public rD : any;
  public user:any;
  uPD={
    "user_id": "",
    "token": "",
    "body": {"usuario":"",
            "empresa":"",
            "id_usuario":"",
            "data":{}
          },
    "fn":""
  };
  fm={"id_empresa":"",
      "id_usuario":"",
      "nombre":"",
      "nickname":"",
      "pass":"",
      "pass_ant":"",
      "correo":"",
      "permisos":{},
    };
constructor( public common: Common,public toastCtrl: ToastController, public authService : AuthService) {
  const d = JSON.parse(localStorage.getItem('userData'));
  if(d!=undefined){
    this.uD = d.userData;
    this.uPD.user_id = this.uD.user_id;
    this.uPD.token = this.uD.token; }
} 
guardarPassUsuario(data){ 
  this.guardar(data);
}
guardarEditarUsuario(data){
  this.guardar(data);
}
infoUsuario() {
  this.uPD.fn="verUsrEdit";
  var d=JSON.parse(localStorage.getItem('userData'));
  if(d!=undefined){
    this.uPD.body.usuario=d.userData.email;
    this.common.presentLoading();
    this.authService.postData(this.uPD, "usuarios").then((r) => {
        this.rD=r;
        console.log(this.rD);
        if(this.rD.count>0){
           this.fm.id_usuario=this.rD.feedData.user_id;
           this.fm.nombre=this.rD.feedData.name;
           this.fm.nickname=this.rD.feedData.username;
           this.fm.correo=this.rD.feedData.email;
           this.user=this.fm;
           console.log(this.fm);
        }else{
       }
      }, (err) => {
        //Connection failed message
      });
      this.common.closeLoading();
    }
  }
  guardar(data){
    console.log(this.uPD);
    
    this.fm.nombre=data.nombre;
    this.fm.correo=data.correo;
    this.fm.pass=data.pass;
    this.fm.pass_ant=data.pass_ant;
    this.uPD.fn="guardarUsrEdit" ;
    this.uPD.body.data=this.fm;
    this.uPD.body.id_usuario=this.uD.user_id;
    this.common.presentLoading();
    this.authService.postData(this.uPD,"usuarios").then((result)=>{
        this.rD = result;
        console.log(this.rD);
        if(this.rD.error!='ninguno')
            this.alerta(this.rD.error);
        else
          this.alerta("Actualizado correctamente");
        this.infoUsuario();
        this.fm.pass="";
        this.fm.pass_ant="";
      },(err) => {
        this.fm.pass="";
        this.fm.pass_ant="";
      });
      this.common.closeLoading();
  }
  alerta(men){
    const toast = this.toastCtrl.create({
      message: men,
      duration: 9000,
      position: 'top'
    });
    toast.present();
   }
}