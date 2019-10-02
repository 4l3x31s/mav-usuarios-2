import { ToastService } from './../services/toast.service';
import { MdlConductora } from './../modelo/mldConductora';
import { AlertService } from './../services/alert.service';
import { LoadingService } from './../services/loading.service';
import { AuthService } from './../services/firebase/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { NavController, Events, AlertController, ToastController } from '@ionic/angular';

import { environment } from '../../environments/environment';
import { StorageService } from '../services/storage.service';
import { UserParamService } from '../services/user-param.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  public user: string;
  public pass: string;
  public conductora: MdlConductora;

  constructor(
    public loadingService: LoadingService,
    public navController: NavController,
    public alertService: AlertService,
    public events: Events,
    public authService: AuthService,
    public alertController: AlertController,
    public storageService: StorageService,
    public userParam: UserParamService,
    public toastController: ToastService,
    
  ) {
    navigator.geolocation.getCurrentPosition((resp) => {
    }, (error) => {
    }, { enableHighAccuracy: true });
  }

  ngOnInit() {
    //this.loadItems();
  }

  ingresar() {
    this.authService.doGoogleLogin()
    .then( res => {
      console.log(res);
      this.navController.navigateRoot('/home');
    }).catch(err => {
      console.log(err);
    })
  }

}
