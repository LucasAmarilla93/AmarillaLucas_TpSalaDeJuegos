import { Routes } from "@angular/router";
import { checkedLogGuard } from "../guards/checked-log-guard";


//IMPLEMENTAR EL ESTA LOGGUEADOGUARD.

export const authRoutes: Routes = [
    {
        path: 'login',
        loadComponent: () => import('../pages/login/login').then((login) => login.Login),
    },
    {
        path: 'registro',
        loadComponent: ()=> import('../pages/registro/registro').then((registro) => registro.Registro),
    },
    {path:'perfil',
        loadComponent: () => import('../pages/perfil/perfil').then((perfil) => perfil.Perfil),
        canActivate: [checkedLogGuard]
    },
    {
        path: 'games',
        loadChildren: () => import('../games/games.routes').then((games) => games.gamesRoutes),
        canActivate: [checkedLogGuard],
    },
    {
        path: 'resultados',
        loadComponent: () => import('../pages/resultados/resultados').then((resultados) => resultados.Resultados),
        canActivate: [checkedLogGuard]
    },
    {
        path: 'encuesta',
        loadComponent: () => import('../pages/encuesta/encuesta').then((encuesta) => encuesta.Encuesta),
        canActivate: [checkedLogGuard]
    }

]