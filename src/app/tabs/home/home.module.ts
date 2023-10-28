import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';
import { ExploreContainerComponentModule } from '../../explore-container/explore-container.module';
import { AccountCardComponent } from '../../components/account-card/account-card.component';

import { Tab1PageRoutingModule } from './home-routing.module';
import {DownloadCardComponent} from "../../components/download-card/download-card.component";

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    Tab1PageRoutingModule,

  ],
  exports: [
    AccountCardComponent
  ],
    declarations: [HomePage, AccountCardComponent, DownloadCardComponent]
})
export class Tab1PageModule {}
