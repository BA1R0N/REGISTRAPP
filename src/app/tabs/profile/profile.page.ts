import { Component } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: 'profile.page.html',
  styleUrls: ['profile.page.scss']
})
export class ProfilePage {

  constructor(
    private authService: AuthService,
  ) {

  }

  isLoggedIn():boolean {

    const user_id:string = this.authService.getCurrentUserId();

    if (user_id === '?') {
      console.log('user is dead: ',user_id)

      const fuck:boolean = false;
      console.log('for real: ',fuck)

      return fuck;

    } else {
      console.log('user is fucked: ', user_id)
      return true;
    }
  }

  async signOut() {
    await this.authService.signOut()
  }

}
