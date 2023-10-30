import { Component, OnInit } from '@angular/core';
import { AuthService} from "../../services/auth/auth.service";

@Component({
  selector: 'app-list-activities',
  templateUrl: './list-activities.component.html',
  styleUrls: ['./list-activities.component.scss'],
})
export class ListActivitiesComponent  implements OnInit {

  constructor(
    private authService: AuthService
  ) { }

  isLogged():boolean {
    return this.authService.isAuthenticated();
  }

  ngOnInit() {}

}
