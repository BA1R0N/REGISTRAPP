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

  // Returns true if the user id is not the default value
  isLoggedIn():boolean {
    const user_id:string = this.authService.getCurrentUserId();
    return user_id !== '?';
  }

  async signOut() {
    await this.authService.signOut()
  }

}
