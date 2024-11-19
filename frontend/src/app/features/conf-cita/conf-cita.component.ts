import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-conf-cita',
  standalone: true,
  imports: [],
  templateUrl: './conf-cita.component.html',
  styles: ``
})
export class ConfCitaComponent {
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
    this.router.navigate(['/appointments']); 
  }

  MisCitas() {
    this.router.navigate(['/mis-citas']);
  }

  MiCuenta() {
    this.router.navigate(['/my-account']);
  }
}