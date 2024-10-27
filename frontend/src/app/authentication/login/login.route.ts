import { Routes } from "@angular/router";

export default[
    {
        path:'login',
        loadComponent:() => import('./login.component').then(m=>m.LoginComponent)
    }
] as Routes;