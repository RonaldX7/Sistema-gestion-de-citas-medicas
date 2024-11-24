import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PatientFeaturesComponent } from './patient-features.component';
import { PatientHomeComponent } from './views/patient-home/patient-home.component';
import { AppointmentsComponent } from './views/appointments/appointments.component';
import { AppointmentsListComponent } from './views/appointments-list/appointments-list.component';

const routes: Routes = [
  {
    path: '',
    component: PatientFeaturesComponent,
    children: [
      { path: 'patient-home', component: PatientHomeComponent },
      { path: 'appointments', component: AppointmentsComponent },
      { path: 'appointments-list', component: AppointmentsListComponent },
      { path: '**', redirectTo: 'patient-home', pathMatch: 'full' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PatientFeaturesRoutingModule {}
