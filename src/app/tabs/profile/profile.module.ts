import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProfilePage } from './profile.page';
import { ExploreContainerComponentModule } from '../../explore-container/explore-container.module';

import { Tab3PageRoutingModule } from './profile-routing.module';
import {ActionSheetComponent} from "../../components/action-sheet/action-sheet.component";

@NgModule({
    imports: [
        IonicModule,
        CommonModule,
        FormsModule,
        ExploreContainerComponentModule,
        Tab3PageRoutingModule
    ],
    exports: [
        ActionSheetComponent
    ],
    declarations: [ProfilePage, ActionSheetComponent]
})
export class Tab3PageModule {}
