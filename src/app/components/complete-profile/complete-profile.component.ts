import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {AuthService} from "../../services/auth/auth.service";
import {AlertController, LoadingController} from "@ionic/angular";
import {Router} from "@angular/router";
import {CreateService} from "../../crud/create.service";

@Component({
  selector: 'app-complete-profile',
  templateUrl: './complete-profile.component.html',
  styleUrls: ['./complete-profile.component.scss'],
})
export class CompleteProfileComponent  implements OnInit {

  form_fields = this.fb.nonNullable.group({
    first_name: ['', Validators.required],
    last_name: ['', Validators.required],
    role: ['', Validators.required],
  })

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private loadingController: LoadingController,
    private alertController: AlertController,
    private router: Router,
    private createService: CreateService,
  ) { }

  ngOnInit() {}

  async confirm() {
    const loading = await this.loadingController.create();
    await loading.present();
    console.log('Confirm clicked')
    console.log(this.form_fields.getRawValue())

    const { first_name, last_name, role } = this.form_fields.getRawValue();

    try {

      await this.createService.completeProfile(first_name, last_name, role, this.authService.getCurrentUserId())
      await loading.dismiss();
      await this.showCustomAlert('Completado', 'Se completó el perfil correctamente');

    } catch (error) {
      console.error(error);
      await loading.dismiss();
      // @ts-ignore
      await this.showAlert('Error', error.message);
    }

  }

  async reload() {
    console.log('clicked')
    await this.authService.refreshSessions();
  }

  async showAlert(title: string, msg: string) {
    const alert = await this.alertController.create({
      header: title,
      message: msg,
      buttons: ['OK'],
    });
    await alert.present();
  }

  // Alerta personalizada que recarga la página al hacer click en OK
  async showCustomAlert(title: string, msg: string) {
    const alert = await this.alertController.create({
      header: title,
      message: msg,
      buttons: ['OK'],
    });
    await alert.present();
    window.addEventListener("click", () => {
      window.location.reload();
    });
  }

}
