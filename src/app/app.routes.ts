import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';

export const routes: Routes = [
    {
      path: 'home',
      data: {
        title: 'Inicio',
        breadcrumb: { skip: true }
      },
      component: HomeComponent,
    },
    {
      path: 'price-calc',
      data: {
        breadcrumb: 'Price Calculator'
      },
      loadChildren: () => import('./pages/price-calc/price-calc.routes').then((m) => m.PRICE_CALCULATOR_ROUTES),
    },
    // {
    //   path: 'games',
    //   loadChildren: () => import('./pages/games/games.routes').then((m) => m.GAMES_ROUTES),
    // },
    {
      path: '',
      data: {
        breadcrumb: { skip: true }
      },
      redirectTo: 'home',
      pathMatch: 'full'
    },
    {
      path: '**',
      data: {
        breadcrumb: { skip: true }
      },
      component: NotFoundComponent,
      pathMatch: 'full'
    },
];

