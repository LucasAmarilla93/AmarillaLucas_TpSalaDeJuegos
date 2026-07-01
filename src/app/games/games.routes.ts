import { Routes } from '@angular/router';
import { checkedLogGuard } from '../guards/checked-log-guard';

//ACORDARME DE IMPLEMENTAR GUARDS.

export const gamesRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('./games').then((games) => games.Games),
    canActivate: [checkedLogGuard]
  },
  {
    path: 'ahorcado',
    loadComponent: () => import('./ahorcado/ahorcado').then((ahorcado) => ahorcado.Ahorcado),
    canActivate: [checkedLogGuard]
  },
  {
    path: 'mayormenor',
    loadComponent: () => import('./mayormenor/mayormenor').then((mayormenor) => mayormenor.Mayormenor),
    canActivate: [checkedLogGuard]
  },
  {
    path: 'preguntados',
    loadComponent: () => import('./preguntados/preguntados').then((preguntados) => preguntados.Preguntados),
    canActivate: [checkedLogGuard]
  },
  {
    path: 'sudoku',
    loadComponent: () => import('./sudoku/sudoku').then((sudoku) => sudoku.Sudoku),
    canActivate: [checkedLogGuard]
  }
];
