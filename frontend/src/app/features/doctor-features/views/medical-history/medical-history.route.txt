import { Routes } from "@angular/router";


export default[
    {
        path:'medical-history',
        loadComponent:() => import('./medical-history.component').then(m=>m.MedicalHistoryComponent)
    }

] as Routes;
