import {Routes} from "@angular/router"

export default [
    {
        path:'appointments',
        loadComponent:()=> import('./appointments.component').then(m=>m.AppointmentsComponent)
    }

] as Routes