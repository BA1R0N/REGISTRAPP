import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GeneratedPage } from './generated.page';

const routes: Routes = [
  {
    path: '',
    component: GeneratedPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GeneratedPageRoutingModule {}
