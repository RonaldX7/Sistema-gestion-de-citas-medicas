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
        path:'recover-password',
        loadComponent:()=> import('./authentication/recover-password/recover-password.component').then(m=>m.RecoverPasswordComponent)
    },
    {
        path:'new-password',
        loadComponent:() => import('./authentication/new-password/new-password.component').then(m=>m.NewPasswordComponent)
    },
    {
        path:'citar-cita',
        loadComponent:() => import('./features/citar-cita/citar-cita.component').then(m=>m.CitarCitaComponent)
    },
    {
        path:'account',
        loadComponent:() => import('./features/account/account.component').then(m=>m.AccountComponent)
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
        path:'appointments-list',
        loadComponent:() => import('./features/appointments-list/appointments-list.component').then(m=>m.AppointmentsListComponent)
    },
    {
        path: 'admin-home',
        loadChildren: () => import('./features/admin-home/admin-home.route').then(m => m.AdminHomeRoutingModule),
    },
    {
    
        path:'medical-history',
        loadComponent:() => import('./features/medical-history/medical-history.component').then(m=>m.MedicalHistoryComponent)
    },
    {
        path:'**',
        redirectTo:'login',
        pathMatch: 'full'
    },
   

];
