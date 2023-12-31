import { NgModule } from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GeneratedPageRoutingModule } from './generated-routing.module';

import { GeneratedPage } from './generated.page';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        GeneratedPageRoutingModule,
        NgOptimizedImage
    ],
  declarations: [GeneratedPage]
})
export class GeneratedPageModule {}
