import { Routes } from "@angular/router";

export default[
    {
        path:'vistamedic',
        loadComponent:() => import('./vistamedic.component').then(m=>m.VistamedicComponent)
    }
] as Routes;
