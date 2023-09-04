import { Component } from '@angular/core';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {

  constructor() {}

  public toastButtons = [
    {
      text: 'Dismiss',
      role: 'cancel',
      animation: true,
    },
  ];

  getUserAgent() {
    let userAgentString = navigator.userAgent;
    if (userAgentString.indexOf('Mobile') !== -1) {
      return 'Telefono movil'
    } else {
      return 'Escritorio'
    }
  }

}
