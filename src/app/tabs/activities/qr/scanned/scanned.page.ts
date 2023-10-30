import { Component, OnInit, Inject } from '@angular/core';
import { QrPage} from "../qr.page";

@Component({
  selector: 'app-scanned',
  templateUrl: './scanned.page.html',
  styleUrls: ['./scanned.page.scss'],
})
export class ScannedPage implements OnInit {



  teacher: string = localStorage.getItem('teacher') ?? '';
  class: string = localStorage.getItem('class') ?? '';
  class_id = localStorage.getItem('token') ?? '';
  class_url:string = localStorage.getItem('scannedUrl') ?? '';

  /*
  teacher: string = 'this.qrPage.teacher';
  class: string = 'this.qrPage.registeredClass';
  class_id = 123;
  class_url:string = 'http://x.x';
  */




  constructor(


  ) { }

  ngOnInit() {
  }

}
