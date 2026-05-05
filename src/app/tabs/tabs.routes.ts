import { Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

export const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'sagas',
        loadComponent: () =>
          import('../SagasMain/sagas/sagas.page').then((m) => m.SagasPage),
      },
      {
        path: 'sagas/:id',
        loadComponent: () =>
          import('../SagasMain/saga-detail/saga-detail.page').then((m) => m.SagaDetailPage),
      },
      {
        path: 'frutas',
        loadComponent: () =>
          import('../frutas/frutas.page').then((m) => m.FrutasPage),
      },
      {
        path: 'personajes',
        loadComponent: () =>
          import('../personajes/personajes.page').then((m) => m.PersonajesPage),
      },
      {
        path: '',
        redirectTo: '/tabs/sagas',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: '',
    redirectTo: '/tabs/sagas',
    pathMatch: 'full',
  },
];