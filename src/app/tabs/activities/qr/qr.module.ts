import { NgModule } from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { QrPageRoutingModule } from './qr-routing.module';

import { QrPage } from './qr.page';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        QrPageRoutingModule,
        NgOptimizedImage,
        ReactiveFormsModule
    ],
  declarations: [QrPage]
})
export class QrPageModule {}
