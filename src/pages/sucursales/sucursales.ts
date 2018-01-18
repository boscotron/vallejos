import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ToastController,AlertController } from 'ionic-angular';
import {jmyapis } from "../../providers/jmyapis"; 

/**
 * Generated class for the ClinicaSucursalesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-sucursales',
  templateUrl: 'sucursales.html',
})
export class SucursalesPage {

 public resultado : any;
	public lista : any;
	public listaO : any;
	searchQuery: string = '';
  	items: string[]; 
	config = {	"API":"56f8341f38cf95ce4d972859ed961e08",
				"TABLA":"sucursales"
				};
  	divs = {"formulario":false,
  			"pntLista":false,
  			"btnGuardar":true,
  			"btnGuardarCambios":false,
   	 		}; 
	pnt = {	"lista":"Cargando lista de sucursales",
			};
    formulario = {	"nombre":"",
    				"calle":"",
    				"no_ext":"",
    				"no_int":"",
    				"colonia":"",
    				"delomun":"",
    				"estado":"",
    				"cp":"",
    				"telefono":"",
    				"ID_F":""
    			};
	constructor(public navCtrl: NavController, public navParams: NavParams, public jmyApis: jmyapis,public toastCtrl: ToastController,public alertCtrl: AlertController) { 	}

	ionViewDidLoad() {
		console.log('ionViewDidLoad ClinicaSucursalesPage ');
		this.ver();
	}


  	borrarPatologia(id){
	  this.jmyApis.borrar({
      "head":{
        "API":this.config.API, 
        "TABLA":this.config.TABLA, 
        "ID_F":id, 
      }, 
      "body":["nombre","calle","no_ext","no_int","colonia","delomun","estado","cp","telefono"], 
    }).then((result) => {
           console.log(result);
           this.ver();
        });
	}

	borrar(id){
	  	console.log("borrar "+id);
	  	let confirm = this.alertCtrl.create({
	      title: 'Estas seguro',
	      message: '¿de borrar esta sucursal?',  
	      buttons: [{
	         	 text: 'Regresar',
	          handler: () => { }},{
	          	text: 'Borrar',
	          handler: () => {
	            this.borrarPatologia(id);
	          }}]});
	    confirm.present();
	  }
	editar(id){
	  	console.log("editar "+id);
	  	this.formulario.ID_F = id;
	  	this.divs.formulario=true;
	  	this.jmyApis.ver({
	          "head":{
	            "API":this.config.API, 
	            "TABLA":this.config.TABLA, 
	            "ID_F":id,           
	          }
	        }).then((result) => {
	           console.log(result);
	           this.resultado = result;
	          	if(this.resultado!=undefined){
	          		this.divs.btnGuardar=false;
	          		this.divs.btnGuardarCambios=true;
	          		this.formulario.nombre = this.resultado.ver.ot[id].nombre;
	          		this.formulario.calle = this.resultado.ver.ot[id].calle;
	          		this.formulario.no_ext = this.resultado.ver.ot[id].no_ext;
	          		this.formulario.no_int = this.resultado.ver.ot[id].no_int;
	          		this.formulario.colonia = this.resultado.ver.ot[id].colonia;
	          		this.formulario.delomun = this.resultado.ver.ot[id].delomun;
	          		this.formulario.estado = this.resultado.ver.ot[id].estado;
	          		this.formulario.cp = this.resultado.ver.ot[id].cp;
	          		this.formulario.telefono = this.resultado.ver.ot[id].telefono;
	          	}
	        });
	}

	guardar(){
		this.jmyApis.guardar({
		  "head":{
		    "API":this.config.API, // *obligatorio API-TABLA
		    "TABLA":this.config.TABLA, 
		    "ID_F":this.formulario.ID_F, // opcional            
		  }, 
		  "body":this.formulario, 
		  }).then((result) => {
		       console.log(result);
		       this.ver();
				this.divs.btnGuardar=true;
				this.divs.btnGuardarCambios=false;
				this.divs.formulario=false;

		    });
	}

	ver(){     
		this.jmyApis.ver({
		      "head":{
		        "API":this.config.API, 
	            "TABLA":this.config.TABLA, 
		      }
		    }).then((result) => {
		       console.log(result);
		       this.resultado = result;
		      	if(this.resultado!=undefined){
		      		this.lista = this.resultado.ver.otFm;
		      		this.listaO = this.lista;
		      		if(this.lista!=null){
		      			this.divs.pntLista=false;
		      		}else{		      			
		      			this.divs.pntLista=true;
		      		}
		      	}
		    });
	}

	getItems(ev: any) {
	    // Reset items back to all of the items
	    //this.initializeItems();
		this.lista = this.listaO;
	    // set val to the value of the searchbar
	    let val = ev.target.value;

	    // if the value is an empty string don't filter the items
	    if (val && val.trim() != '') {
	      this.lista = this.lista.filter((item) => {
	        return (item.nombre.toLowerCase().indexOf(val.toLowerCase()) > -1);
	      })
	    }
	}
  //Funciones UI
  verFormulario(){ 
	this.divs.btnGuardar=true;
	this.divs.btnGuardarCambios=false;
  	this.divs.formulario=(this.divs.formulario)?false:true; 
  	this.formulario = {	"nombre":"",
	    				"calle":"",
	    				"no_ext":"",
	    				"no_int":"",
	    				"colonia":"",
	    				"delomun":"",
	    				"estado":"",
	    				"cp":"",
	    				"telefono":"",
    					"ID_F":""
	    			};
  }
  alerta(men) {
    const toast = this.toastCtrl.create({
      message: men,
      duration: 9000,
      position: 'top'
    });
    toast.present();
   }

}
