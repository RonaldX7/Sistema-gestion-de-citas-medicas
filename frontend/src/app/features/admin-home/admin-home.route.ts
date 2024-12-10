import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminHomeComponent } from './admin-home.component';
import { AddDocComponent } from './views/add-doc/add-doc.component';
import { ListCitasComponent } from './views/list-citas/list-citas.component';
import { RentabilidadComponent } from './views/rentabilidad/rentabilidad.component';

const routes: Routes = [
  {
    path: '',
    component: AdminHomeComponent,
    children: [
      { path: 'add-doc', component: AddDocComponent },
      { path: 'list-citas', component: ListCitasComponent },
      { path: 'rentabilidad', component: RentabilidadComponent },
      { path: '**', redirectTo: 'list-citas', pathMatch: 'full' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminHomeRoutingModule {}
