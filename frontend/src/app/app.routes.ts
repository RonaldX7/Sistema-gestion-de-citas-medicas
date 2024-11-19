import { Routes } from '@angular/router';
import { LoginComponent } from './authentication/login/login.component';
import { MyAccountComponent } from './features/my-account/my-account.component';
    

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
        path:'doctor-home',
        loadComponent:()=>import('./features/doctor-home/doctor-home.component').then(m=>m.DoctorHomeComponent)
    },
    {
        path: 'appointments',
        loadComponent:()=>import('./features/appointments/appointments.component').then(m=>m.AppointmentsComponent)
    },
    {
        path: 'my-account',
        loadComponent:()=>import('./features/my-account/my-account.component').then(m=>m.MyAccountComponent)
    },
    {
        path: 'conf-cita',
        loadComponent:()=>import('./features/conf-cita/conf-cita.component').then(m=>m.ConfCitaComponent)
    },
    {
        path: 'mis-citas',
        loadComponent:()=>import('./features/mis-citas/mis-citas.component').then(m=>m.MisCitasComponent)
    },
    {
        path:'**',
        redirectTo:'login'
    }


];
