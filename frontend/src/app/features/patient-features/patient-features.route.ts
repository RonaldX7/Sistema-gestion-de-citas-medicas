import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PatientFeaturesComponent } from './patient-features.component';
import { PatientHomeComponent } from './views/patient-home/patient-home.component';
import { AppointmentsComponent } from './views/appointments/appointments.component';
import { AppointmentsListComponent } from './views/appointments-list/appointments-list.component';
import { MyAccountComponent } from './views/my-account/my-account.component';
import { AuthGuard } from '../../core/services/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: PatientFeaturesComponent,
    children: [
      { path: 'patient-home', component: PatientHomeComponent, canActivate:[AuthGuard] },
      { path: 'appointments', component: AppointmentsComponent, canActivate:[AuthGuard] },
      { path: 'appointments-list', component: AppointmentsListComponent, canActivate:[AuthGuard] },
      { path: 'my-account', component: MyAccountComponent, canActivate:[AuthGuard]},
      { path: '**', redirectTo: 'patient-home', pathMatch: 'full' }, 
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PatientFeaturesRoutingModule {}
