import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'tab1',
        loadChildren: () => import('../tab1/tab1.module').then(m => m.Tab1PageModule)
      },
      {
        path: 'tab2',
        loadChildren: () => import('../tab2/tab2.module').then(m => m.Tab2PageModule)
      },
      {
        path: 'tab3',
        loadChildren: () => import('../tab3/tab3.module').then(m => m.Tab3PageModule)
      },
      {
        path: 'tab4',
        loadChildren: () => import('../tab4/tab4.module').then(m => m.Tab4PageModule)
      },
      {
        path: 'tab5',
        loadChildren: () => import('../tab5/tab5.module').then(m => m.Tab5PageModule)
      },
      {
        path: 'listespecialidades',
        loadChildren: () => import('../listespecialidades/listespecialidades.module').then( m => m.ListespecialidadesPageModule)
      },
      {
        path: 'listmedicoespecialidade',
        loadChildren: () => import('../listmedicoespecialidade/listmedicoespecialidade.module').then( m => m.ListmedicoespecialidadePageModule)
      },
      {
        path: 'listespecialidadeclinica',
        loadChildren: () => import('../listespecialidadeclinica/listespecialidadeclinica.module').then( m => m.ListespecialidadeclinicaPageModule)
      },
      {
        path: 'agenda',
        loadChildren: () => import('../agenda/agenda.module').then(m => m.AgendaPageModule)
      },
      {
        path: 'error',
        loadChildren: () => import('../error/error.module').then(m => m.ErrorPageModule)
      },
      {
        path: 'adm',
        loadChildren: () => import('../adm/adm.module').then(m => m.AdmPageModule)
      },
      {
        path: '',
        redirectTo: '/tabs/tab3',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/tab3',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule { }
