import { Component ,ViewChild} from '@angular/core';
import { IonicPage, NavController, NavParams,ToastController,AlertController, Content } from 'ionic-angular';
import {jmyapis } from "../../providers/jmyapis";

/**
 * Generated class for the ClinicaAlimentosPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-alimentos',
  templateUrl: 'alimentos.html',
})
export class AlimentosPage {
	  @ViewChild(Content) content: Content;
	public resultado : any;
	public lista : any;
	public listaO : any;
	public resultadoPatologias : any;
	searchQuery: string = '';
  	ingredientes: string[];
	config = {	"API":"e7e549ace5363b1d33c50874923af0d7",
				"TABLA":"alimentos"
				};
	configPatologias = {	"API":"826478886fbc555e3993205022e35fa8",
							"TABLA":"patologias"
							};
  	divs = {"formulario":false,
  			"pntLista":false,
  			"btnGuardar":true,
  			"btnGuardarCambios":false,
   	 		};
	pnt = {	"lista":"Cargando lista de patologías",
			};
    formulario = {	"nombre":"",
    				"ingredientes":[],
    				"preparacion":"",
    				"tipo":[],
    				"tiempo":[],
    				"temporada":[],
    				"patologias":[],
    				"calorias":"",
    				"ID_F":""
    			};
    tags = [];
    tipo= [];
    tiempo= [];
    temporada= [];
    patologias= [];

	constructor(public navCtrl: NavController, public navParams: NavParams, public jmyApis: jmyapis,public toastCtrl: ToastController,public alertCtrl: AlertController) { 	
		
		this.verPatologias();
	}

	ionViewDidLoad() {
		console.log('ionViewDidLoad ClinicaPatologiaPage');
		this.ver();
	}
	onChange(val){
	    console.log(this.tags)
	  }  

  	borrarPatologia(id){
	  this.jmyApis.borrar({
      "head":{
        "API":this.config.API, 
        "TABLA":this.config.TABLA, 
        "ID_F":id, 
      }, 
      "body":["nombre","descripcion","ingredientes","preparacion","tipo","tiempo","temporada","patologias","calorias","proteinas","hdec","fibra","sodio","colesterol"], 
    }).then((result) => {
           console.log(result);
           this.ver();
        });
	}
	getOffices(officeId) {
	    console.log(officeId);
	    
	}
	verPatologias(){     
		this.jmyApis.ver({
		      "head":{
		        "API":this.configPatologias.API, 
	            "TABLA":this.configPatologias.TABLA, 
		      }
		    }).then((result) => {
		       this.resultadoPatologias = result;
		       this.resultadoPatologias = this.resultadoPatologias.ver.otFm;
		       console.log(this.resultadoPatologias);
		       
		      	/*if(this.resultado!=undefined){
		      		this.lista = this.resultado.ver.otFm;
		      		this.listaO = this.lista;
		      		if(this.lista!=null)
		      			this.pnt.lista="";
		      		else
		      			this.pnt.lista="Aún no hay datos guardados";
		      	}*/
		    });
	}

	borrar(id){
		this.scrollToTop();
		this.limpiarFormulario();
	  	console.log("borrar "+id);
	  	let confirm = this.alertCtrl.create({
	      title: 'Estas seguro',
	      message: '¿de borrar esta patología?',  
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
		this.scrollToTop();
  		this.limpiarFormulario();
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
	          		this.ingredientes = JSON.parse(this.resultado.ver.ot[id].ingredientes);
	          		this.formulario.ingredientes = this.ingredientes;
	          		this.tipo = JSON.parse(this.resultado.ver.ot[id].tipo);
					this.formulario.tipo =this.tipo;
	          		this.tiempo = JSON.parse(this.resultado.ver.ot[id].tiempo);
					this.formulario.tiempo =this.tiempo;
	          		this.temporada = JSON.parse(this.resultado.ver.ot[id].temporada);
					this.formulario.temporada =this.temporada;
	          		this.patologias = JSON.parse(this.resultado.ver.ot[id].patologias);
					this.formulario.patologias =this.patologias;
	          		this.formulario.preparacion = this.resultado.ver.ot[id].preparacion;
	          		this.formulario.tipo = this.resultado.ver.ot[id].tipo;
	          		this.formulario.tiempo = this.resultado.ver.ot[id].tiempo;
	          		this.formulario.temporada = this.resultado.ver.ot[id].temporada;
	          		this.formulario.calorias = this.resultado.ver.ot[id].calorias;
				console.log(this.formulario);
	          	}
	        });
	}

	guardar(){
		
		this.formulario.ingredientes =this.ingredientes;
		this.formulario.tipo =this.tipo;
		this.formulario.tiempo =this.tiempo;
		this.formulario.temporada =this.temporada;
		this.formulario.patologias =this.patologias;
		console.log(this.formulario);
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
  				this.limpiarFormulario();

		    });
	}

	ver(){     
		this.scrollToBottom();
		this.jmyApis.ver({
		      "head":{
		        "API":this.config.API, 
	            "TABLA":this.config.TABLA, 
		      }
		    }).then((result) => {
		       //console.log(result);
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

	buscar(ev: any) {
		this.lista = this.listaO;
	    let val = ev.target.value;
	    if (val && val.trim() != '') {
	      this.lista = this.lista.filter((item) => {
	        return (item.nombre.toLowerCase().indexOf(val.toLowerCase()) > -1);
	      })
	    }
	    this.scrollToBottom();
	}
  //Funciones UI
  limpiarFormulario(){
  	this.formulario = {	"nombre":"",
    				"ingredientes":[],
    				"preparacion":"",
    				"tipo":[],
    				"tiempo":[],
    				"temporada":[],
    				"patologias":[],
    				"calorias":"",
    				"ID_F":""
    			};
	this.ingredientes = [];
    this.tipo= [];
    this.tiempo= [];
    this.temporada= [];
    this.patologias= [];
  }
  verFormulario(){ 
	this.divs.btnGuardar=true;
	this.divs.btnGuardarCambios=false;
  	this.divs.formulario=(this.divs.formulario)?false:true; 
  	this.limpiarFormulario();
  }
  alerta(men) {
    const toast = this.toastCtrl.create({
      message: men,
      duration: 9000,
      position: 'top'
    });
    toast.present();
   }

   scrollToBottom() { 
        setTimeout(() => {
            if (this.content.scrollToBottom) {
                this.content.scrollToBottom();
            }
        }, 400)
    }
   scrollToTop() { 
        setTimeout(() => {
            if (this.content.scrollToBottom) {
                this.content.scrollToTop();
            }
        }, 400)
    }

}
