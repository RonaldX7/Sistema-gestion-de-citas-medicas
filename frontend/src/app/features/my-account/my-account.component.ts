import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common'; // Importar CommonModule

@Component({
  selector: 'app-my-account',
  standalone: true,
  imports: [CommonModule], // Incluir CommonModule aquí
  templateUrl: './my-account.component.html',
  styles: ``,
})
export class MyAccountComponent {
  showUpdateModalFlag = false; // Controla el modal de "Actualizar Datos"
  showPasswordModalFlag = false; // Controla el modal de "Actualizar Contraseña"

  constructor(private router: Router) {}

  // Navegación entre rutas
  logout(): void {
    this.router.navigate(['/login']);
  }

  PatientHome(): void {
    this.router.navigate(['/patient-home']);
  }

  PidetuCita(): void {
    this.router.navigate(['/appointments']);
  }

  MisCitas(): void {
    this.router.navigate(['/mis-citas']);
  }

  MiCuenta(): void {
    this.router.navigate(['/my-account']);
  }

  // Métodos para controlar los modales
  showUpdateModal(): void {
    this.showUpdateModalFlag = true;
  }

  showPasswordModal(): void {
    this.showPasswordModalFlag = true;
  }

  closeModal(): void {
    this.showUpdateModalFlag = false;
    this.showPasswordModalFlag = false;
  }
}
