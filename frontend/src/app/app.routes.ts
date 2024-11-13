import { Routes } from '@angular/router';
import { LoginComponent } from './authentication/login/login.component';

export const routes: Routes = [
  {
    path:'login',
    loadComponent:()=> import('./authentication/login/login.component').then(m=>m.LoginComponent)
},

{
  path:'register',
  loadComponent:()=> import('./authentication/register/register.component').then(m=>m.RegisterComponent)
},
{
  path:'listquotes',
        loadComponent:() => import('./features/listquotes/listquotes.component').then(m=>m.ListquotesComponent)
},

{
  path:'vistamedic',
        loadComponent:() => import('./features/vistamedic/vistamedic.component').then(m=>m.VistamedicComponent)
},

{
    path:'**',
    redirectTo:'login'
}
];

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
        path:'**',
        redirectTo:'login'
    }
    


];
