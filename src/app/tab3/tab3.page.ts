import { Component } from '@angular/core';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  constructor() {}

  user = {
    email: '',
    password: '',
  }

  createUser() {
    localStorage.setItem('user', JSON.stringify(this.user));
    console.log("User created: ", this.user);
  }

  isRegistered() {
    let local_user = localStorage.getItem('user');
    let not_null_user:string = local_user ?? "empty";
    if (not_null_user == "empty") {
      return false;
    } else {
      let user = JSON.parse(not_null_user);
      return !(user.email == '' && user.password == '');
    }
  }

  showLocal():string {
    let local_user = localStorage.getItem('user');

    let not_null_user:string = local_user ?? "empty";

    if (not_null_user == "empty") {
      return 'Crear una cuenta'
    } else {
      let user = JSON.parse(not_null_user);
      let name = user.email.split('@')[0]
      return 'Perfil de '+ name.charAt(0).toUpperCase() + name.slice(1)
    }
  }

  showUserLoggedIn():string {
    let local_user = localStorage.getItem('user');
    let not_null_user:string = local_user ?? "empty";
    if (not_null_user == "empty") {
      return 'null'
    } else {
      let user = JSON.parse(not_null_user);
      return user.email
    }
  }

  logOut() {
    localStorage.removeItem('user');
    console.log("User logged out!");
  }

  // TODO: crear función para resetear contraseña
  resetPassword() {

  }

}
