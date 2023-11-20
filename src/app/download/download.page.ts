import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-download',
  templateUrl: './download.page.html',
  styleUrls: ['./download.page.scss'],
})
export class DownloadPage implements OnInit {
  url = 'https://github.com/sbgallardo/registrapp/releases/download/';
  version = 'v1.2.0';
  name = 'RegistrAPP-v.1.2.0-Android.apk';

  constructor() { }
  // Redirecciona al enlace de descarga al ser llamada

  downloadApp() {
    const url = this.url + this.version + '/' + this.name;
    window.open(url, '_system');
  }

  ngOnInit() {
  }

}
