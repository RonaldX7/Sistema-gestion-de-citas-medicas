import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DoctorFeaturesComponent } from './doctor-features.component';
import { DoctorHomeComponent } from './views/doctor-home/doctor-home.component';
import { AccountComponent } from './views/account/account.component';
import { CitarCitaComponent } from './views/citar-cita/citar-cita.component';
import { VistamedicComponent } from './views/vistamedic/vistamedic.component';
import { MedicalHistoryComponent } from './views/medical-history/medical-history.component';

const routes: Routes = [
  {
    path: '',
    component: DoctorFeaturesComponent,
    children: [
      { path: 'doctor-home', component: DoctorHomeComponent },
      { path: 'account', component: AccountComponent },
      { path: 'citar-cita', component: CitarCitaComponent },
      { path: 'vistamedic', component: VistamedicComponent },
      { path: 'medical-history', component: MedicalHistoryComponent},
      { path: '**', redirectTo: 'doctor-home', pathMatch: 'full' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DoctorFeaturesRoutingModule {}