import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { QrPage } from './qr.page';

const routes: Routes = [
  {
    path: '',
    component: QrPage
  },
  {
    path: 'generated',
    loadChildren: () => import('./generated/generated.module').then( m => m.GeneratedPageModule)
  },
  {
    path: 'scanned',
    loadChildren: () => import('./scanned/scanned.module').then( m => m.ScannedPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class QrPageRoutingModule {}
