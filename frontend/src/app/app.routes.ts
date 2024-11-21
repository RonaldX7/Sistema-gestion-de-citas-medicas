import { Routes } from '@angular/router';

export const routes: Routes = [
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
        path: 'doctor-features',
        loadChildren: () => import('./features/doctor-features/doctor-features.route').then(m=>m.DoctorFeaturesRoutingModule),
    },
    {
        path:'**',
        redirectTo:'login',
        pathMatch: 'full'
    },

];
