import {Component} from '@angular/core';
import {BarcodeScanner} from '@ionic-native/barcode-scanner/ngx';

@Component({
  selector: 'app-activities',
  templateUrl: 'activities.page.html',
  styleUrls: ['activities.page.scss']
})
export class ActivitiesPage {
  userAgent: string = this.getUserAgent();
  device: string = this.mobileOrDesktop();
  dataList: any[] = [];
  private intervalId: any;
  scannedToken: string = '';
  afterScanPage: boolean = false;
  registeredClass: string = '';
  teacher: string = '';


  constructor(private barcodeScanner: BarcodeScanner) {}


  qrInfo = {
      classname : 'matematicas',
      token: localStorage.getItem('token') ?? 0,
      email: this.getCurrentUser(),
      image: localStorage.getItem('image') ?? '',
      scannedUrl: localStorage.getItem('scannedUrl') ?? ''
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

    this.ngOnInit();
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
    return this.afterScanPage;
  }

  getListLength():number {
    return this.dataList.length;
  }

  getUrl():string {
    return 'https://api.registrapp.sebas.lat/a?token='+ this.qrInfo.token;
  }

  scanCode() {
    localStorage.removeItem('scannedUrl')
    this.barcodeScanner.scan().then(barcodeData => {
      let scannedToken:string = barcodeData.text.split('?token=') [1];
      this.scannedToken = scannedToken;
      this.afterScanPage = true;
      localStorage.setItem('scannedUrl', scannedToken);
      this.scanCodeAction().then(r => console.log(r));
      console.log('Barcode data', barcodeData);
    }).catch(err => {
      console.log('Error', err);
      localStorage.setItem('scannedUrl', 'error');
      return 'Error';
    });
  }


  async scanCodeAction(){
    let post_url = 'https://api.registrapp.sebas.lat/a?token=' + this.scannedToken +'&email='+this.qrInfo.email;

    let response = await fetch(post_url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    let json = await response.json();
    this.registeredClass = json.classname;
    this.teacher = json.teacher;
    console.log(json);
  }

}

