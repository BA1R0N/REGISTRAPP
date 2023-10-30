import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { ProfilePage } from './profile.page';
import { ExploreContainerComponentModule } from '../../explore-container/explore-container.module';

import { Tab3PageRoutingModule } from './profile-routing.module';
import {ActionSheetComponent} from "../../components/action-sheet/action-sheet.component";
import {Tab1PageModule} from "../home/home.module";
import {CompleteProfileComponent} from "../../components/complete-profile/complete-profile.component";
import {ProfileCardComponent} from "../../components/profile-card/profile-card.component";

@NgModule({
    imports: [
        IonicModule,
        CommonModule,
        FormsModule,
        ExploreContainerComponentModule,
        Tab3PageRoutingModule,
        Tab1PageModule,
        NgOptimizedImage,
        ReactiveFormsModule
    ],
    exports: [
        ActionSheetComponent
    ],
  declarations: [ProfilePage, ActionSheetComponent, CompleteProfileComponent, ProfileCardComponent]
})
export class Tab3PageModule {}
