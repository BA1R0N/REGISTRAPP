import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {AuthService} from "../../../../services/auth/auth.service";
import {AlertController, LoadingController} from "@ionic/angular";
import {Router} from "@angular/router";
import {CreateService} from "../../../../crud/create.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  email:string = '';

  form_fields = this.fb.nonNullable.group({
    name: ['', Validators.required],
    class_code: ['', Validators.required],
  })

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private loadingController: LoadingController,
    private alertController: AlertController,
    private router: Router,
    private createService: CreateService,
  ) { }

  ngOnInit() {
    this.authService.getCurrentUser().subscribe((user) => {
      if (user) {
        // @ts-ignore
        this.email = user.email;
      }
    });
  }

  async confirm() {
    const loading = await this.loadingController.create();
    await loading.present();
    console.log('Confirm clicked')
    console.log(this.form_fields.getRawValue())

    const { name, class_code } = this.form_fields.getRawValue();

    try {

      await this.createService.registerClass(name, class_code, this.email, this.authService.getCurrentUserId())
      await loading.dismiss();
      await this.showAlert('OK', 'Se registro la clase: '+name);

    } catch (error) {
      console.error(error);
      await loading.dismiss();
      // @ts-ignore
      await this.showAlert('Error', error.message);
    }
  }

  async showAlert(title: string, msg: string) {
    const alert = await this.alertController.create({
      header: title,
      message: msg,
      buttons: ['OK'],
    });
    await alert.present();
    this.router.navigate(['/tabs/activities/classes']);
  }

}
