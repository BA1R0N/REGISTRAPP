import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ActivitiesPage } from './activities.page';
import {authGuard} from "../../guards/auth.guard";

const routes: Routes = [
  {
    path: '',
    component: ActivitiesPage,
  },
  {
    path: 'qr',
    loadChildren: () => import('./qr/qr.module').then( m => m.QrPageModule),
    canActivate: [authGuard]
  },
  {
    path: 'classes',
    loadChildren: () => import('./classes/classes.module').then( m => m.ClassesPageModule),
    canActivate: [authGuard]
  },
  {
    path: 'forms',
    loadChildren: () => import('./forms/forms.module').then( m => m.FormsPageModule),
    canActivate: [authGuard]
  },
  {
    path: 'wiki',
    loadChildren: () => import('./wiki/wiki.module').then( m => m.WikiPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Tab2PageRoutingModule {}
