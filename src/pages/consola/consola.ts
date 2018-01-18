import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { jmyapis } from '../../providers/jmyapis';

/**
 * Generated class for the ConsolaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-consola',
  templateUrl: 'consola.html',
})
export class ConsolaPage {
  public print={"session":"",
  				"verempresas":"",
  				"jmyData":"",
  				"empresadefault":"",
  				"vermenu":"",
  				"empresaapi":"",
  				"userDataSend":"",
				};
  constructor(public navCtrl: NavController, public navParams: NavParams, public jmyApis: jmyapis) {
  	 //localStorage.setItem('jmyData', JSON.stringify(this.resposeData.jmyapi) );

  }

  ionViewDidLoad() {
  	 var data = localStorage.getItem('jmyData');
  	 if(data!=null){
		var userDataSend = localStorage.getItem('userDataSend');
		this.print.jmyData=data;
		this.print.userDataSend=userDataSend;
		this.print.session=this.verSession();
		this.print.verempresas=JSON.stringify(this.jmyApis.verempresas());
		this.print.empresadefault=this.jmyApis.empresadefault();
		this.print.vermenu=JSON.stringify(this.jmyApis.vermenu(this.jmyApis.empresadefault()));
		this.print.empresaapi=this.jmyApis.empresaapi(this.jmyApis.empresadefault());
	 }
    console.log('ionViewDidLoad ConsolaPage');
    

  }

  verSession(){
  	var data = localStorage.getItem('userData');



  	console.log(data);
  	return data;
  }

}
