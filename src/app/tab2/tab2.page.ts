import {Component} from '@angular/core';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  userAgent: string = this.getUserAgent();
  device: string = this.mobileOrDesktop();
  constructor() {}

  debugInfo = {
    show: false,
    generatedDesktop: false,
    generatedMobile: false,
  }

  qrInfo = {
    classname : 'math',
    email: this.getCurrentUser(),
    image: localStorage.getItem('image') ?? '',
  }

  getUserAgent(): string {
    return navigator.userAgent;
  }

  mobileOrDesktop(): string {
    if (this.userAgent.indexOf('Mobile') > -1) {
      return 'Mobile';
    } else {
      return 'Desktop';
    }
  }

  desktopBool():boolean {
    return this.mobileOrDesktop() != 'Mobile';
  }

  titleMessage():string {
    if (this.desktopBool()) {
      return 'Generar QR';
    } else {
      return 'Escanear QR';
    }
  }

  showPlatform():string {
    if (this.desktopBool()) {
      return 'computadora';
    } else {
      return 'telefono movil';
    }
  }

  getCurrentUser():string {
    let local_user = localStorage.getItem('user');
    let not_null_user:string = local_user ?? "empty";
    if (not_null_user == "empty") {
      return 'null'
    } else {
      let user = JSON.parse(not_null_user);
      return user.email
    }
  }

  async generateQR() {
    // set debug.desktopGenerated to 'true'
    localStorage.setItem('generatedDesktop', 'true');

    let email = this.getCurrentUser();

    let result = await fetch('https://api.registrapp.sebas.lat/generate?email='+ email + '&classname=' + this.qrInfo.classname,
      {
        method: 'GET',
      }
    )

    let json = await result.json();
    console.log(json);

    localStorage.setItem('image', 'true');

    let xd = this.qrInfo.image = json.image;
    console.log(xd);
    localStorage.setItem('image', xd);



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


  generatedPageDesktop() {

    let boolPage = localStorage.getItem('generatedDesktop');

    if (boolPage == null) {
      console.log('null');
      return true;
    } else if (boolPage == 'true') {
      console.log('true');
      return false;
    } else if (boolPage == 'false') {
      console.log('false');
      return false;
    } else if (boolPage == '') {
      console.log('empty');
      return false;
    } else {
      console.log('else');
      return false;
    }

  }

  deleteCacheDesktop() {
    localStorage.removeItem('generatedDesktop');
  }

  generatedPageMobile() {
    return false
  }

}

