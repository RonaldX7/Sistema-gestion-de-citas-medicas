import { Routes } from "@angular/router";


export default[
    {
        path:'account',
        loadComponent:() => import('./account.component').then(m=>m.AccountComponent)
    }

] as Routes;
