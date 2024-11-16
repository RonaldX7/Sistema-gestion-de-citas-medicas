import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddDocComponent } from './views/add-doc/add-doc.component';
import { ListCitasComponent } from './views/list-citas/list-citas.component';
import { ListUsersComponent } from './views/list-users/list-users.component';
import { AdminHomeComponent } from './admin-home.component';

const routes: Routes = [
  {
    path: '', // <- Rutas hijas cargadas dentro de AdminHomeComponent
    component: AdminHomeComponent,
    children: [
      { path: 'add-doc', component: AddDocComponent },
      { path: 'list-citas', component: ListCitasComponent },
      { path: 'list-users', component: ListUsersComponent },
      { path: '', redirectTo: 'list-citas', pathMatch: 'full' }, // Ruta por defecto
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminHomeRoutingModule {}
