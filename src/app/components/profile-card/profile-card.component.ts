import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-profile-card',
  templateUrl: './profile-card.component.html',
  styleUrls: ['./profile-card.component.scss'],
})
export class ProfileCardComponent  implements OnInit {

  constructor(
    private authService: AuthService,
  ) { }

  async signOut() {
    await this.authService.signOut()
  }
  ngOnInit() {}

}
