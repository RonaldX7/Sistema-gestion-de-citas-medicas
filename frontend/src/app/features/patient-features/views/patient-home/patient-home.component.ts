import { Component } from '@angular/core';
import { AuthService } from '../../../../core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-patient-home',
  standalone: true,
  imports: [],
  templateUrl: './patient-home.component.html',
  styles: ``
})
export class PatientHomeComponent {
  constructor(private authService:AuthService, private router:Router){
    
  }
  toAppointment(){
    this.router.navigate(['/patient-features/appointments'])
  }
  toAppointmentList(){
    this.router.navigate(['/patient-features/appointments-list'])
  }
  
  toAccount(){
    this.router.navigate(['/patient-features/my-account'])
  }
}
