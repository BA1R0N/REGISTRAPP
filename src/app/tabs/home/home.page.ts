import { Component } from '@angular/core';
import { ReadService } from '../../crud/read.service';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage {
  userAgent: string = this.getUserAgent();
  constructor(
    private authService: AuthService,
  ) {}

  readUserName():string {
    let local_user = localStorage.getItem('user');
    let not_null_user:string = local_user ?? "empty";
    if (not_null_user == "empty") {
      return 'por favor registrate para usar la app'
    } else {
      let user = JSON.parse(not_null_user);
      let name = user.email.split('@')[0]
      return name.charAt(0).toUpperCase() + name.slice(1)
    }
  }

  loggedIn():boolean {
    let local_user = localStorage.getItem('user');
    let not_null_user:string = local_user ?? "empty";
    if (not_null_user == "empty") {
      return false;
    } else {
      let user = JSON.parse(not_null_user);
      return !(user.email == '' && user.password == '');
    }
  }

  isMobile(): boolean {
    return this.userAgent.indexOf('Mobile') > -1;
  }

  getUserAgent(): string {
    return navigator.userAgent;
  }

  async getHola() {
    const crud = new ReadService(this.authService);
    let idd = this.authService.getCurrentUserId();
    console.log('idd: ', idd)
    const x = await crud.isProfileCompleted(this.authService.getCurrentUserId());
    console.log('Is completed?: ',x)
  }

}
