import { Routes } from "@angular/router";

export default[
    {
        path:'listquotes',
        loadComponent:() => import('./listquotes.component').then(m=>m.ListquotesComponent)
    }
] as Routes;
