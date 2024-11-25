import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path:'login',
        loadComponent:()=> import('./authentication/login/login.component').then(m=>m.LoginComponent)
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
        path: 'patient-features',
        loadChildren: () => import('./features/patient-features/patient-features.route').then(m => m.PatientFeaturesRoutingModule),

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
