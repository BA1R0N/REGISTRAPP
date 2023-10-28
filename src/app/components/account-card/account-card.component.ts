import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth/auth.service';
import {ReadService} from "../../crud/read.service";


@Component({
  selector: 'app-account-card',
  templateUrl: './account-card.component.html',
  styleUrls: ['./account-card.component.scss'],
})
export class AccountCardComponent  implements OnInit {
  fist_name: string = '';

  constructor(
    private authService: AuthService,
    private readService: ReadService
  ) { }

  // Retornar true si el usuario está logueado
  isLoggedIn():boolean {
    const user_id:string = this.authService.getCurrentUserId();
    return user_id !== '?';
  }



  ngOnInit() {
    this.readService.getNames().then((data) => {
      console.log('data: ', data)
      if (data) {
        this.fist_name = data[0].first_name;
      }
    });

  }


}
