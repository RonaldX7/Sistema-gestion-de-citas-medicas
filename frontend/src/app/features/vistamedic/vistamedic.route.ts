import { Routes } from "@angular/router";

export default[
    {
        path:'listquotes',
        loadComponent:() => import('./vistamedic.component').then(m=>m.VistamedicComponent)
    }
] as Routes;
