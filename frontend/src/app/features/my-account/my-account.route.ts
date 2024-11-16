import { Routes } from "@angular/router";


export default[
    {
        path:'my-account',
        loadComponent:() => import('./my-account.component').then(m=>m.MyAccountComponent)
    }

] as Routes;