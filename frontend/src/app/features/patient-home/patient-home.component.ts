import { Component } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';
import { MyAccountComponent } from "../my-account/my-account.component";

@Component({
  selector: 'app-patient-home',
  standalone: true,
  imports: [MyAccountComponent],
  templateUrl: './patient-home.component.html',
  styles: ``
})
export class PatientHomeComponent {
  constructor(private authService:AuthService, private router:Router){}

  MiCuenta(): void {
    this.router.navigate(['/my-account']);
  }

  PidetuCita(): void {
    this.router.navigate(['/appointments']);
  }

  MisCitas(): void {
    this.router.navigate(['/mis-citas']);
  }

  logout(): void {
    this.router.navigate(['/login']);
  }
}
