import { Component, OnInit } from '@angular/core';
import {BarcodeScanner} from "@ionic-native/barcode-scanner/ngx";
import {AuthService} from "../../../services/auth/auth.service";
import {Platform} from "@ionic/angular";
import {navigate} from "ionicons/icons";
import {Router} from "@angular/router";
import {ReadService} from "../../../crud/read.service";
import {FormBuilder, Validators} from "@angular/forms";

@Component({
  selector: 'app-qr',
  templateUrl: './qr.page.html',
  styleUrls: ['./qr.page.scss'],
})
export class QrPage implements OnInit {

  userAgent: string = this.getUserAgent();
  device: string = this.mobileOrDesktop();
  dataList: any[] = [];
  private intervalId: any;
  scannedToken: string = '';
  afterScanPage: boolean = false;
  registeredClass: string = '';
  teacher: string = '';
  classes: any[] = [];
  show_button:boolean = false;


  form_fields = this.fb.nonNullable.group({
    class: ['', Validators.required],
  });

  classname = this.form_fields.getRawValue().class;

  constructor(
    private fb: FormBuilder,
    private barcodeScanner: BarcodeScanner,
    private authService: AuthService,
    private platform: Platform,
    private router: Router,
    private readService: ReadService
  ) {}


  qrInfo = {
    classname : this.form_fields.getRawValue().class ?? '',
    token: localStorage.getItem('token') ?? 0,
    email: this.getCurrentUser(),
    image: localStorage.getItem('image') ?? '',
    scannedUrl: localStorage.getItem('scannedUrl') ?? ''
  }

  ngOnInit() {
    this.getClassList();
    this.authService.getCurrentUser().subscribe((user) => {
      if (user) {
        // @ts-ignore
        console.log('user email:', user.email);
        // @ts-ignore
        this.qrInfo.email = user.email;
      }
    });
    if (this.qrInfo.token == '0') {
      //console.log('token es 0');
    } else {
      this.intervalId = setInterval(() => {
        this.fetchData().then((data) => {
          this.dataList = data;
        });
      }, 2500);
    }

    this.show_button = localStorage.getItem('show_button') == 'true';
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


  showPlatform():string {
    if (this.desktopBool()) {
      return 'computadora';
    } else {
      return 'telefono movil';
    }
  }

  getCurrentUser():string {
    let email: string = '';
    this.authService.getCurrentUser().subscribe((user) => {
      if (user) {
        // @ts-ignore
        email = user.email;
      }
    })
    return email;
  }

  async generateQR() {

    //localStorage.setItem('generatedDesktop', 'true');
    localStorage.setItem('class', this.form_fields.getRawValue().class);
    const sbtn = localStorage.getItem('show_button');
    localStorage.setItem('show_button', 'true');

    if (sbtn == 'true') {
      this.show_button = true;
    } else {
      this.show_button = false;
    }

    let email = this.getCurrentUser();
    let classname = this.form_fields.getRawValue().class;
    console.log('classname:', classname);

    let result = await fetch('https://api.registrapp.sebas.lat/generate?email='+ email + '&classname=' + classname,
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
      localStorage.setItem('token', scannedToken);
      this.afterScanPage = true;

      this.scanCodeAction().then(r => console.log(r));
      if (barcodeData.cancelled) {
        localStorage.setItem('scannedUrl', 'error');
        this.router.navigate(['/tabs/activities/qr/']);
      } else {


        this.router.navigate(['/tabs/activities/qr/scanned']);
      }
    }).catch(err => {
      console.log('Error', err);
      localStorage.setItem('scannedUrl', 'error');
      this.router.navigate(['/tabs/activities/qr']);
    });
  }

  async scanCodeAction(){
    let post_url = 'https://api.registrapp.sebas.lat/a?token=' + this.scannedToken +'&email='+this.qrInfo.email;
    localStorage.setItem('scannedUrl', post_url);

    let response = await fetch(post_url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    let json = await response.json();
    this.registeredClass = json.classname;
    this.teacher = json.teacher;
    localStorage.setItem('class', this.registeredClass);
    localStorage.setItem('teacher', this.teacher);
    console.log(json);
  }

  isApp():boolean {
    return this.platform.is('capacitor');
  }

  getClassList() {
    this.readService.getClasses(this.authService.getCurrentUserId()).then((data) => {
      if (data) {
        this.classes = data;
      } else {
        this.classes = [];
      }
    })

  }

  showButton():boolean {
    const state = localStorage.getItem('show_button');
    console.log('state:', state)

    if (localStorage.getItem('show_button') == 'true') {
      return true;
    } else if (localStorage.getItem('show_button') == 'false') {
      return false;
    } else {
      return false;
    }
  }

}
