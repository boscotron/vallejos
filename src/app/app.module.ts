import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { AuthService } from '../providers/auth-service';
import { SplitPane } from '../providers/split-pane';
import { Common } from '../providers/common';

import { jmyapis } from '../providers/jmyapis';
import { JMYDB } from '../providers/jmydb';
import { jmykeys } from '../providers/jmy-key';
import { jmyfatkit } from '../providers/jmy-fat-kit';
import { HttpModule } from "@angular/http";
import { Welcome } from '../pages/welcome/welcome';
import { Login } from '../pages/login/login';
import { Signup } from '../pages/signup/signup';
import { RepassPage } from '../pages/repass/repass';
import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { MiPerfilPage } from '../pages/mi-perfil/mi-perfil';
import { AlimentosPage } from '../pages/alimentos/alimentos';
import { SucursalesPage } from '../pages/sucursales/sucursales';
import { ReportePage } from '../pages/reporte/reporte';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { MomentModule } from 'angular2-moment';
import { LinkyModule } from 'angular-linky'; 

import {IonTagsInputModule} from "ionic-tags-input";

@NgModule({
  declarations: [
    MyApp,
    Welcome,
    Login,
    Signup,
    RepassPage,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    MiPerfilPage,
    AlimentosPage,
    SucursalesPage,
    ReportePage
  ],
  imports: [
    BrowserModule,HttpModule,MomentModule,LinkyModule,IonTagsInputModule,
    IonicModule.forRoot(MyApp,{tabsPlacement: 'top'})
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    Welcome,
    Login,
    Signup,
    RepassPage,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    MiPerfilPage,
    AlimentosPage,
    SucursalesPage,
    ReportePage
  ],
  providers: [
    StatusBar,
    SplashScreen,AuthService,SplitPane,Common,jmyapis,JMYDB,jmyfatkit,jmykeys,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
