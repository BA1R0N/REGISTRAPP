import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import {NotFoundComponent} from "./components/not-found/not-found.component";

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./user/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'signup',
    loadChildren: () => import('./user/signup/signup.module').then( m => m.SignupPageModule)
  },
  {
    path: 'download',
    loadChildren: () => import('./download/download.module').then( m => m.DownloadPageModule)
  },
  {
    path: 'descargar',
    redirectTo: '/download',
  },
  {
    path: 'account-confirmation',
    loadChildren: () => import('./account-confirmation/account-confirmation.module').then( m => m.AccountConfirmationPageModule)
  },
  {
    path: '404',
    component: NotFoundComponent
  },
  {
    path: '**',
    redirectTo: '/404'
  },
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
