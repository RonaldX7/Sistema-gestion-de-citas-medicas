import { Routes } from "@angular/router";


export default[
    {
        path:'conf-cita',
        loadComponent:() => import('./conf-cita.component').then(m=>m.ConfCitaComponent)
    }

] as Routes;