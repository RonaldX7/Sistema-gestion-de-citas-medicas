import { Routes } from "@angular/router";


export default[
    {
        path:'order',
        loadComponent:() => import('./order.component').then(m=>m.OrderComponent)
    }

] as Routes;