import { Routes } from "@angular/router";


export default[
    {
        path:'mis-citas',
        loadComponent:() => import('./mis-citas.component').then(m=>m.MisCitasComponent)
    }

] as Routes;