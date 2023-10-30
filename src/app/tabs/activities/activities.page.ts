import {Component} from '@angular/core';


@Component({
  selector: 'app-activities',
  templateUrl: 'activities.page.html',
  styleUrls: ['activities.page.scss']
})
export class ActivitiesPage {
  userAgent: string = this.getUserAgent();

  constructor() {}


  ngOnInit() {

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


}

