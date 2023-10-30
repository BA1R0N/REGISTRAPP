import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../../../services/auth/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-generated',
  templateUrl: './generated.page.html',
  styleUrls: ['./generated.page.scss'],
})
export class GeneratedPage implements OnInit {
  class = localStorage.getItem('class') ?? '';
  email = this.getEmail();
  class_id = localStorage.getItem('token') ?? '';
  class_url = localStorage.getItem('scannedUrl') ?? '';
  img_url = localStorage.getItem('image') ?? '';
  dataList: any[] = [];
  private intervalId: any;

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    this.authService.getCurrentUser().subscribe((user) => {
      if (user) {
        // @ts-ignore
        this.email = user.email;
      }
    });
    if (this.class_id != '0') {
      this.intervalId = setInterval(() => {
        this.fetchData().then((data) => {
          this.dataList = data;
        });
      }, 2500);
    }
  }

  getEmail():string {
    let email: string = 'x';
    this.authService.getCurrentUser().subscribe((user) => {
      if (user) {
        // @ts-ignore
        email = user.email;
      }
    })
    return email;
  }

  async fetchData(): Promise<any[]> {
    console.log('https://api.registrapp.sebas.lat/a?token='+ this.class_id);
    const response = await fetch('https://api.registrapp.sebas.lat/a?token='+ this.class_id);
    let foo = await response.json();
    return foo.students;
  }

  getListLength():number {
    return this.dataList.length;
  }

  cancel() {
    this.dataList = [];
    localStorage.removeItem('generatedDesktop');
    localStorage.removeItem('class');
    localStorage.removeItem('token');
    localStorage.removeItem('scannedUrl');
    localStorage.removeItem('image');
    localStorage.setItem('show_button', 'false');
    this.router.navigate(['/tabs/activities/qr']);
  }

}
