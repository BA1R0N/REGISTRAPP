import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { ReadService } from "../../crud/read.service";

@Component({
  selector: 'app-profile-card',
  templateUrl: './profile-card.component.html',
  styleUrls: ['./profile-card.component.scss'],
})
export class ProfileCardComponent  implements OnInit {
  email:string = 'email';
  names:string = 'John Doe';
  role:string = 'Estudiante';

  constructor(
    private authService: AuthService,
    private readService: ReadService,
  ) { }

  async signOut() {
    await this.authService.signOut()
  }


  ngOnInit() {
    this.readService.getUserData(this.authService.user_id).then((data) => {
      try {
        // @ts-ignore
        this.names = data[0].first_name + ' ' + data[0].last_name;
        // @ts-ignore
        this.role = data[0].type;
      } catch (e) {
        console.error(e);
      }
    });

    this.authService.getCurrentUser().subscribe((user) => {
      if (user) {
        // @ts-ignore
        this.email = user.email;
      }
    });
  }

}
