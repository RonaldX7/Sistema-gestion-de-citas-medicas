import { Routes } from "@angular/router";

export default[
    {
        path:'recover-password',
        loadComponent:() => import('./recover-password.component').then(m=>m.RecoverPasswordComponent)
    }
] as Routes;