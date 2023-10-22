import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivitiesPage } from './activities.page';
import { ExploreContainerComponentModule } from '../../explore-container/explore-container.module';

import { Tab2PageRoutingModule } from './activities-routing.module';
import {ListActivitiesComponent} from "../../components/list-activities/list-activities.component";
import {Tab1PageModule} from "../home/home.module";

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    Tab2PageRoutingModule,
    NgOptimizedImage,
    Tab1PageModule
  ],
    declarations: [ActivitiesPage, ListActivitiesComponent]
})
export class Tab2PageModule {}
