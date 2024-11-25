import { Routes } from "@angular/router";

export default[
    {
        path:'new-password',
        loadComponent:() => import('./new-password.component').then(m=>m.NewPasswordComponent)
    }
] as Routes;