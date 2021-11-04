import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

import { LoginGuard } from './guards/login.guard';
import { AdmPage } from './pages/adm/adm.page';
import { LoginPage } from './pages/login/login.page';
import { TabsPage } from './pages/tabs/tabs.page';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '', loadChildren: () => import('../app/pages/tabs/tabs.module').then(m => m.TabsPageModule), canActivate: [AuthGuard] },
  { path: 'login', loadChildren: () => import('../app/pages/login/login.module').then(m => m.LoginPageModule), canActivate: [LoginGuard] },
  {
    path: 'adm',
    component: AdmPage
  },
  {
    path: 'listmedicos',
    loadChildren: () => import('./pages/listmedicos/listmedicos.module').then(m => m.ListmedicosPageModule)
  },
  {
    path: 'medico',
    loadChildren: () => import('./pages/medico/medico.module').then(m => m.MedicoPageModule)
  },
  {
    path: 'medico/:id',
    loadChildren: () => import('./pages/medico/medico.module').then(m => m.MedicoPageModule)
  }

];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
