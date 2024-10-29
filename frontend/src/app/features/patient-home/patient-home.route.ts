import {Routes} from "@angular/router"

export default [
    {
        path:'patient-home',
        loadComponent:()=> import('./patient-home.component').then(m=>m.PatientHomeComponent)
    }

] as Routes