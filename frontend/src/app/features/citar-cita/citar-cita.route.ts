import { Routes } from "@angular/router";


export default[
    {
        path:'citar-cita',
        loadComponent:() => import('./citar-cita.component').then(m=>m.CitarCitaComponent)
    }

] as Routes;