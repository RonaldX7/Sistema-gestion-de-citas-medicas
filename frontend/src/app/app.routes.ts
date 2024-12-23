import { Routes } from '@angular/router';
import { AuthRedirectGuard } from './core/services/auth-redirect.guard';

export const routes: Routes = [
    {path:'login', loadComponent:()=> import('./authentication/login/login.component').then(m=>m.LoginComponent), canActivate: [AuthRedirectGuard]},
    {path:'register',loadComponent:()=>import('./authentication/register/register.component').then(m=>m.RegisterComponent)},
    {path:'recover-password',loadComponent:()=> import('./authentication/recover-password/recover-password.component').then(m=>m.RecoverPasswordComponent)},
    {path: 'patient-features', loadChildren: () => import('./features/patient-features/patient-features.route').then(m => m.PatientFeaturesRoutingModule)},

    {path: 'admin-home',loadChildren: () => import('./features/admin-home/admin-home.route').then(m => m.AdminHomeRoutingModule),},
    {path: 'doctor-features',loadChildren: () => import('./features/doctor-features/doctor-features.route').then(m=>m.DoctorFeaturesRoutingModule)},
    {path:'**',redirectTo:'login',pathMatch: 'full'},

];
