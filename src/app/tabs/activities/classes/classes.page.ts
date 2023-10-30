import {Component, OnInit} from '@angular/core';
import {ReadService} from "../../../crud/read.service";
import {AuthService} from "../../../services/auth/auth.service";

@Component({
  selector: 'app-classes',
  templateUrl: './classes.page.html',
  styleUrls: ['./classes.page.scss'],
})
export class ClassesPage implements OnInit {
  classes:any[] = [];


  constructor(
    private readService: ReadService,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.getClasses();
  }

  async getClasses(){
    let classes = []
    // @ts-ignore
    classes = await this.readService.getClasses(this.authService.getCurrentUserId());
    let data = classes[0];
    console.log('LS',data);
    console.log('clases: ', classes);

    this.classes = classes;

    return classes
  }


}
