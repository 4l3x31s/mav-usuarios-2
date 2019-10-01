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
  form: FormGroup;
  public user: string;
  public pass: string;
  public conductora: MdlConductora;

  constructor(
    public fb: FormBuilder,
    public loadingService: LoadingService,
    public navController: NavController,
    public alertService: AlertService,
    public events: Events,
    public authService: AuthService,
    public alertController: AlertController,
    private storageService: StorageService,
    public userParam: UserParamService,
    public toastController: ToastService
  ) {
    navigator.geolocation.getCurrentPosition((resp) => {
    }, (error) => {
    }, { enableHighAccuracy: true });
  }

  ngOnInit() {
    this.iniciaValidaciones();
    this.loadItems();
  }
  iniciaValidaciones() {
    this.form = this.fb.group({
      vuser: ['', [
        Validators.required,
      ]],
      vpass: ['', [
        Validators.required,
      ]]
    });
  }
  get f(): any { return this.form.controls; }

  ingresar() {

  }
  registrar() {
    this.navController.navigateRoot('/detalle-cliente');
  }
  async presentAlertPrompt() {
    const alert = await this.alertController.create({
      header: 'Recuperación Contraseña',
      message: 'Ingrese su correo electrónico.',
      inputs: [
        {
          name: 'txtEmailPop',
          type: 'text',
          placeholder: 'ejemplo@ejemplo.com',
          label: 'Email'
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
          }
        }, {
          text: 'Enviar',
          handler: (data) => {
            if (data.txtEmailPop.length > 0) {
              this.authService.resetPassword(data.txtEmailPop)
              .then( () => {
                this.toastController.presentToast('Se ha enviado el correo.');
              }, err => {
                this.toastController.presentToast('Hubo un error al enviar el correo.');
              })
            } else {
              this.toastController.presentToast('Debe ingresar un correo válido.');
            }
          }
        }
      ]
    });

    await alert.present();
  }
  enviarCorreo() {
    this.presentAlertPrompt();
  }
  loadItems() {
    this.storageService.getItems().then(items => {
      let lstUsuarios:Array<MdlConductora> = items;
      if(lstUsuarios) {
        this.events.publish('user:login');
        this.conductora = lstUsuarios[0];
        this.userParam.set(this.conductora);
        this.navController.navigateRoot('/home');
      }
    });
  }
}
