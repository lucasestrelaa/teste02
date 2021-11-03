import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { LoginGuard } from './guards/login.guard';
<<<<<<< Updated upstream

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '', loadChildren: () => import('./pages/tabs/tabs.module').then(m => m.TabsPageModule), canActivate: [AuthGuard] },
  { path: 'login', loadChildren: () => import('./pages/login/login.module').then(m => m.LoginPageModule), canActivate: [LoginGuard] }
=======
import { AdmPage } from './pages/adm/adm.page';
import { LoginPage } from './pages/login/login.page';
import { MedicosPage } from './pages/medicos/medicos.page';
import { MedicoslistPage } from './pages/medicoslist/medicoslist.page';
import { TabsPage } from './pages/tabs/tabs.page';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '', loadChildren: () => import('../app/pages/tabs/tabs.module').then(m => m.TabsPageModule), canActivate: [AuthGuard] },
  { path: 'login', loadChildren: () => import('../app/pages/login/login.module').then(m => m.LoginPageModule), canActivate: [LoginGuard] },
  {
    path: 'adm',
    component: AdmPage, canActivate: [AuthGuard]
  },
  { path: 'medicos', component: MedicosPage, canActivate: [AuthGuard] },
    { path: 'medicos/:id', component: MedicosPage, canActivate: [AuthGuard] },
  { path: 'medicoslist', component: MedicoslistPage, canActivate: [AuthGuard] },
>>>>>>> Stashed changes
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
