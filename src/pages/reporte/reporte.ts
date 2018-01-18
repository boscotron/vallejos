import {Component} from '@angular/core';
import { NavController, App } from 'ionic-angular';

import {Common} from "../../providers/common";
import {jmyapis } from "../../providers/jmyapis";

/**
 * Generated class for the ReportePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-reporte',
  templateUrl: 'reporte.html',
})
export class ReportePage {

  public resultado : any;
  resultadoPrint = "";
  formulario = {"campo1":""

    };
  constructor( public common: Common, public navCtrl : NavController, public app : App, public jmyApis: jmyapis) {

    this.ver();

  }

borrar(){
  this.jmyApis.borrar({
      "head":{
        "API":"938a6b38e5092f1ccaede78f57665fdc", // *obligatorio API-TABLA
        "TABLA":"Test", // *obligatorio API-TABLA
        //"DB":"0ee548ef3c64b6564191bb0d15a0cc08", // *obligatorio 
        "ID_F":"Prueba", // opcional            
      }, 
      "body":["campo1"], 
    }).then((result) => {
           console.log(result);
           this.ver();
        });
}

guardar(){
  this.jmyApis.guardar({
      "head":{
        "API":"938a6b38e5092f1ccaede78f57665fdc", // *obligatorio API-TABLA
        "TABLA":"Test", // *obligatorio API-TABLA

        //"DB":"0ee548ef3c64b6564191bb0d15a0cc08", // *obligatorio 
        "ID_F":"Prueba", // opcional            
      }, 
      "body":{
        "campo1":this.formulario.campo1,
        "varialbe1":"guardar uno 3 ",
        "varialbe2":{"guardar uno":"guardar dos  3"},
      }, 
    }).then((result) => {
           console.log(result);
           this.ver();
        });
}

ver(){     
   this.jmyApis.ver({
          "head":{
            "API":"938a6b38e5092f1ccaede78f57665fdc", // *obligatorio API-TABLA
            "TABLA":"Test", // *obligatorio API-TABLA
            //"DB":"0ee548ef3c64b6564191bb0d15a0cc08", // *obligatorio ver, guardar
            "ID_F":"Prueba", // opcional ver, guardar
            //"COL":{"nombre_db","nombre"}, // opcional ver
            //"SALIDA":{"array*",nombre_db","nombre"}, // opcional ver
            //"ID_V":{}, // opcional ver
            //"ID_S":{}, // opcional ver
            //"LIKE_V":{"angora","luciernaga"}, // opcional ver
            //"LIKE_V_OPER":"OR", // opcional ver
          }
        }).then((result) => {
           console.log(result);
           this.resultado = result;
           if(this.resultado!=undefined){
             if(this.resultado.error=='ninguno' && this.resultado.ver.otKey!=null){
                  this.resultadoPrint = this.resultado.ver.ot.Prueba.campo1;

                 }
            }
        });
  }


}
