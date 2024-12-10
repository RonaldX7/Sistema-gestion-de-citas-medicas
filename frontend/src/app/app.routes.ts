import { Routes } from '@angular/router';
import { LoginComponent } from './authentication/login/login.component';

export const routes: Routes = [

    //pacientes
    {
        path:'login',
        loadComponent:()=> import('./authentication/login/login.component').then(m=>m.LoginComponent)
    },
    
    {
        path:'patient-home',
        loadComponent:()=> import('./features/patient-home/patient-home.component').then(m=>m.PatientHomeComponent)
    },
    {
        path:'register',
        loadComponent:()=>import('./authentication/register/register.component').then(m=>m.RegisterComponent)
    },
    {
        path: 'appointments',
        loadComponent:()=>import('./features/appointments/appointments.component').then(m=>m.AppointmentsComponent)
    },
    //doctor
    {
        path:'doctor-home',
        loadComponent:()=>import('./features/doctor-home/doctor-home.component').then(m=>m.DoctorHomeComponent)
    },
    {
        path:'citar-cita',
        loadComponent:()=>import('./features/citar-cita/citar-cita.component').then(m=>m.CitarCitaComponent)
    },
    {
        path:'**',
        redirectTo:'login',
        pathMatch: 'full'
    }
 

];
