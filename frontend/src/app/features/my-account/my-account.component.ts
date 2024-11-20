import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-my-account',
  standalone: true,
  imports: [],
  templateUrl: './my-account.component.html',
  styles: ``
})
export class MyAccountComponent {
  constructor(
    private router: Router
  ){}

  logout(): void {
    //localStorage.removeItem('authToken');
    this.router.navigate(['/login']);
  }

  PatientHome() {
    this.router.navigate(['/patient-home']); // Cambiar ruta según configuración
  }

  PidetuCita() {
    this.router.navigate(['/appointments']); // Cambiar ruta según configuración
  }

  MisCitas() {
    this.router.navigate(['/mis-citas']);
  }

  MiCuenta() {
    this.router.navigate(['/my-account']);
  }
}