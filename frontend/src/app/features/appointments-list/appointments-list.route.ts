import { Routes } from "@angular/router";


export default[
    {
        path:'appointments-list',
        loadComponent:() => import('./appointments-list.component').then(m=>m.AppointmentsListComponent)
    }

] as Routes;