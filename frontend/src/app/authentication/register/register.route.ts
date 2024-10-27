import { Routes } from "@angular/router";


export default[
    {
        path:'register',
        loadComponent:() => import('./register.component').then(m=>m.RegisterComponent)
    }

] as Routes;