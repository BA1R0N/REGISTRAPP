import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss'],
})
export class NotFoundComponent  implements OnInit {

  constructor() { }

  ngOnInit() {
    // return 404 http status code



  }

  goBack() {
    window.history.back();
  }

}
