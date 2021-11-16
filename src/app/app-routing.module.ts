import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

import { LoginGuard } from './guards/login.guard';
import { AdmPage } from './pages/adm/adm.page';


const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '', loadChildren: () => import('../app/pages/tabs/tabs.module').then(m => m.TabsPageModule), canActivate: [AuthGuard] },
  { path: 'login', loadChildren: () => import('../app/pages/login/login.module').then(m => m.LoginPageModule), canActivate: [LoginGuard] },
  {
    path: 'adm',
    component: AdmPage, canActivate: [AuthGuard]
  },
  {
    path: 'listmedicos',
    loadChildren: () => import('./pages/listmedicos/listmedicos.module').then(m => m.ListmedicosPageModule), canActivate: [AuthGuard]
  },
  {
    path: 'medico',
    loadChildren: () => import('./pages/medico/medico.module').then(m => m.MedicoPageModule),canActivate: [AuthGuard]
  },
  {
    path: 'medico/:id',
    loadChildren: () => import('./pages/medico/medico.module').then(m => m.MedicoPageModule),canActivate: [AuthGuard]
  },
  {
    path: 'clinica',
    loadChildren: () => import('./pages/clinica/clinica.module').then( m => m.ClinicaPageModule),canActivate: [AuthGuard]
  },
  {
    path: 'clinica/:id',
    loadChildren: () => import('./pages/clinica/clinica.module').then( m => m.ClinicaPageModule),canActivate: [AuthGuard]
  },
  {
    path: 'listclinicas',
    loadChildren: () => import('./pages/listclinicas/listclinicas.module').then( m => m.ListclinicasPageModule),canActivate: [AuthGuard]
  },
  {
    path: 'listespecialidades',
    loadChildren: () => import('./pages/listespecialidades/listespecialidades.module').then( m => m.ListespecialidadesPageModule),canActivate: [AuthGuard]
  },
  {
    path: 'especialidade',
    loadChildren: () => import('./pages/especialidade/especialidade.module').then( m => m.EspecialidadePageModule),canActivate: [AuthGuard]
  },
  {
    path: 'uf',
    loadChildren: () => import('./pages/uf/uf.module').then( m => m.UfPageModule),canActivate: [AuthGuard]
  },
  {
    path: 'listufs',
    loadChildren: () => import('./pages/listufs/listufs.module').then( m => m.ListufsPageModule),canActivate: [AuthGuard]
  },
  {
    path: 'orgaoemissor',
    loadChildren: () => import('./pages/orgaoemissor/orgaoemissor.module').then( m => m.OrgaoemissorPageModule)
  },
  {
    path: 'listorgaosemissores',
    loadChildren: () => import('./pages/listorgaosemissores/listorgaosemissores.module').then( m => m.ListorgaosemissoresPageModule)
  },
  {
    path: 'dependente',
    loadChildren: () => import('./pages/dependente/dependente.module').then( m => m.DependentePageModule)
  },
  {
    path: 'dependente/:id',
    loadChildren: () => import('./pages/dependente/dependente.module').then( m => m.DependentePageModule)
  },
  {
    path: 'listdependentes',
    loadChildren: () => import('./pages/listdependentes/listdependentes.module').then( m => m.ListdependentesPageModule)
  }

];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
