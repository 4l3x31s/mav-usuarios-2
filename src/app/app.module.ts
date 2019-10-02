import { IonicStorageModule } from '@ionic/storage';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { HttpClientModule } from '@angular/common/http';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule, AngularFireDatabase } from '@angular/fire/database';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { FCM } from '@ionic-native/fcm/ngx';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { StorageService } from './services/storage.service';
import { Geolocation } from '@ionic-native/geolocation/ngx';

export const firebaseConfig = {
  apiKey: 'AIzaSyCC22o8Imks6DbAf4DXrxgtW_wPE6XYLHs',
    authDomain: 'mav-db.firebaseapp.com',
    databaseURL: 'https://mav-db.firebaseio.com',
    projectId: 'mav-db',
    storageBucket: 'mav-db.appspot.com',
    messagingSenderId: '69193804419',
    appId: '1:69193804419:web:6c522a0e26f79eb5'
};

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    IonicStorageModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireStorageModule,
    AngularFirestoreModule,
    AngularFireAuthModule

  ],
  providers: [
    StatusBar,
    SplashScreen,
    AngularFireDatabase,
    FCM,
    InAppBrowser,
    StorageService,
    Geolocation,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
