import { Routes } from '@angular/router';

export const homeRoutes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'home',
    loadComponent: () => import('./home').then((home) => home.Home),
  },
  {
    path: 'auth',
    loadChildren: () => import('../../auth/auth.routes').then((auth) => auth.authRoutes),
  },

  {
    path: '**',
    redirectTo: 'home',
  },
];
