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
        path: 'order',
        loadComponent:()=>import('./features/order/order.component').then(m=>m.OrderComponent)
    },
    {
        path:'**',
        redirectTo:'login'
    }
    


];
