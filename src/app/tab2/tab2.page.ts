import {Component} from '@angular/core';



@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  userAgent: string = this.getUserAgent();
  device: string = this.mobileOrDesktop();
  dataList: any[] = [];
  private intervalId: any;


  constructor() {}



  qrInfo = {
      classname : 'matematicas',
      token: localStorage.getItem('token') ?? 0,
      email: this.getCurrentUser(),
      image: localStorage.getItem('image') ?? '',
  }

  ngOnInit() {
    if (this.qrInfo.token == '0') {
      console.log('token es 0');
    } else {
      this.intervalId = setInterval(() => {
          this.fetchData().then((data) => {
              this.dataList = data;
          });
      }, 2500);
    }
  }

  ngOnDestroy() {
      clearInterval(this.intervalId);
  }

  debugInfo = {
    show: false,
    generatedDesktop: false,
    generatedMobile: false,
  }

  async fetchData(): Promise<any[]> {
    console.log('https://api.registrapp.sebas.lat/a?token='+ this.qrInfo.token);
      const response = await fetch('https://api.registrapp.sebas.lat/a?token='+ this.qrInfo.token);
      let foo = await response.json();
      return foo.students;
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

    this.ngOnInit()
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

    let image = this.qrInfo.image = json.image;
    let token = this.qrInfo.token = json.token;

    console.log(image);
    console.log(token);

    localStorage.setItem('image', image);
    localStorage.removeItem('token');
    localStorage.setItem('token', token);

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
    this.dataList = [];
    this.ngOnDestroy();
    localStorage.removeItem('generatedDesktop');
  }

  generatedPageMobile() {
    return false
  }

  getListLength():number {
    return this.dataList.length;
  }

  getUrl():string {
    return 'https://api.registrapp.sebas.lat/a?token='+ this.qrInfo.token;
  }

}

