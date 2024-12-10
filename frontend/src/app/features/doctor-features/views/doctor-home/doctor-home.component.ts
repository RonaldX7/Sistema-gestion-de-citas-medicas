import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../../core/services/auth.service';


@Component({
  selector: 'app-doctor-home',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './doctor-home.component.html',
  styles: ``
})
export class DoctorHomeComponent {
  constructor(private router:Router){}

  toCitas(){
    this.router.navigate(['/doctor-features/citar-cita'])
  }
  toAccount(){
    this.router.navigate(['/doctor-features/account'])
  }

  toHistory(){
    this.router.navigate(['/doctor-features/medical-history'])
  }
}
