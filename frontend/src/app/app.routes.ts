import { Routes } from '@angular/router';

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

