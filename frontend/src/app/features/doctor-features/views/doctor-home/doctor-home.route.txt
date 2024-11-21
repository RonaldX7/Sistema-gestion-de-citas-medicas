import { Routes } from "@angular/router";


export default[
    {
        path:'doctor-home',
        loadComponent:() => import('./doctor-home.component').then(m=>m.DoctorHomeComponent)
    }

] as Routes;