import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-download',
  templateUrl: './download.page.html',
  styleUrls: ['./download.page.scss'],
})
export class DownloadPage implements OnInit {

  constructor() { }

  // Redirecciona al enlace de descarga al ser llamada
  downloadApp() {
    window.open('https://github.com/sbgallardo/registrapp/releases/download/v1.1.0/RegistrAPP-v.1.1.0-Android.apk', '_system');
  }

  ngOnInit() {
  }

}
