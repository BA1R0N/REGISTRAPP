import { Component } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { ReadService } from "../../crud/read.service";

@Component({
  selector: 'app-profile',
  templateUrl: 'profile.page.html',
  styleUrls: ['profile.page.scss']
})
export class ProfilePage {
  profileCompleted:boolean = false;

  constructor(
    private authService: AuthService,
    private readService: ReadService,
  ) { }

  // Returns true if the user id is not the default value
  isLoggedIn():boolean {
    const user_id:string = this.authService.getCurrentUserId();
    return user_id !== '?';
  }

  // Cierra la sesion del usuario
  async signOut() {
    await this.authService.signOut()
  }

  ngOnInit() {
    this.checkProfileCompleted().then(r =>
      console.log('profileCompleted: ', this.profileCompleted)
    );
  }

  async checkProfileCompleted() {
    const user_id:string = this.authService.getCurrentUserId();
    console.log('user_id: ', user_id)
    this.profileCompleted = await this.readService.isProfileCompleted(user_id);
    console.log('Completed?: ', this.profileCompleted)
  }


}
