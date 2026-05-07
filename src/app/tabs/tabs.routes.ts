import { Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

export const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'sagas',
        loadComponent: () =>
          import('../sagasMain/sagas/sagas.page').then(m => m.SagasPage),
      },
      {
        path: 'sagas/:id',
        loadComponent: () =>
          import('../sagasMain/saga-detail/saga-detail.page').then(m => m.SagaDetailPage),
      },
      {
        path: 'frutas',
        loadComponent: () =>
          import('../frutasMain/frutas/frutas.page').then(m => m.FrutasPage),
      },
      {
        path: 'frutas/:id',
        loadComponent: () =>
          import('../frutasMain/frutas-detail/frutas-detail.page').then(m => m.FrutasDetailPage),
      },
      {
        path: 'personajes',
        loadComponent: () =>
          import('../personajesMain/personajes/personajes.page').then(m => m.PersonajesPage),
      },
      {
        path: 'personajes/:id',
        loadComponent: () =>
          import('../personajesMain/personaje-detail/personaje-detail.page').then(m => m.PersonajeDetailPage),
      },
      {
        path: '',
        redirectTo: 'personajes',
        pathMatch: 'full',
      },
    ],
  },
];