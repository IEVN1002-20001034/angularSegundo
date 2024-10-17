import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path:'auth',
        loadChildren:()=> import('./auth/features/auth.routers')
    },
    {
        path:'formulario',
        loadChildren:()=> import('./formulario/nav.routers')
    },
    
    {
        path:'*',
        redirectTo:''
    },
];