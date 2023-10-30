import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {AuthService} from "../../services/auth/auth.service";
import {AlertController, LoadingController} from "@ionic/angular";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  credentials = this.fb.nonNullable.group({
    email: ['', Validators.required],
    password: ['', Validators.required]
  })

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private loadingController: LoadingController,
    private alertController: AlertController,
    private router: Router
  ) {
    this.authService.getCurrentUser().subscribe((user) => {
      if (user) {
        console.log('GOT USER ON LOGIN');
        this.router.navigateByUrl('/', { replaceUrl: true });
      }
    });
  }

  get email() { return this.credentials.get('email') }

  get password() { return this.credentials.get('password') }

  ngOnInit() {
  }

  // Funcion que llama a la funcion de autenticacion "signIn" y autentica al usuario
  async login() {
    const loading = await this.loadingController.create();
    await loading.present();

    this.authService.signIn(this.credentials.getRawValue()).then(
      async (data) => {
        await loading.dismiss();
        if (data.error) {
          this.showAlert('Error de login', data.error.message)
        }
      }
    )
  }

  // Envia un email para iniciar sesion sin contraseña
  async getMagicLink() {
    const alert = await this.alertController.create({
      header: 'Iniciar sesion sin contraseña',
      message: 'Ingresa tu correo electronico para recibir un link de acceso',
      inputs: [
        {
          type: 'email',
          name: 'email',
          value: '',
        },
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        },
        {
          text: 'Enviar',
          handler: async (result) => {
            const loading = await this.loadingController.create();
            await loading.present();
            const { data, error } = await this.authService.signInWithEmail(result.email);
            await loading.dismiss();
            console.log('after signup: ', data);
            console.log('after signup error: ', error);

            if (error) {
              this.showAlert('Failed', error.message);
            } else {
              this.showAlert('Correcto', 'Se envio el enlace.');
            }
          },
        },
      ],
    });
    await alert.present();
  }

  // Alerta html
  async showAlert(title: string, msg: string) {
    const alert = await this.alertController.create({
      header: title,
      message: msg,
      buttons: ['OK'],
    });
    await alert.present();
  }

  // Envia un enlace para recuperar contraseña al email
  async forgotPassword() {
    const alert = await this.alertController.create({
      header: 'Recupera tu contraseña',
      message: 'Ingresa tu email',
      inputs: [
        {
          type: 'email',
          name: 'email',
        },
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        },
        {
          text: 'Reiniciar contraseña',
          handler: async (result) => {
            const loading = await this.loadingController.create();
            await loading.present();
            const { data, error } = await this.authService.sendPasswordResetEmail(result.email);
            await loading.dismiss();

            if (error) {
              this.showAlert('Failed', error.message);
            } else {
              this.showAlert('Success', 'Please check your emails for further instructions!');
            }
          },
        },
      ],
    });
    await alert.present();
  }







}

