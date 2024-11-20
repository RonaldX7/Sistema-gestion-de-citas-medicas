import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mis-citas',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './mis-citas.component.html',
  styles: ``
})
export class MisCitasComponent {

  showMisCitas: boolean = true;
  showMiHistorial: boolean = false;
  showModal: boolean = false;
  showReprogramModal: boolean = false; // Modal de confirmación para reprogramar
  showAnularModal: boolean = false; // Modal de anulación
  showAnuladaSuccessModal: boolean = false; // Modal de éxito tras anulación


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

  toMyHistorial(){
    this.showMisCitas = false; // Ocultamos "Mis Citas Programadas"
    this.showMiHistorial = true;
    
  }
  showProgramadas() {
    this.showMisCitas = true;
    this.showMiHistorial = false; // Ocultamos "Mi Historial de Citas"
  
  }
  openModal() {
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }
  // Modal de confirmación para reprogramar
  openReprogramModal() {
    this.showReprogramModal = true; // Abre el modal de confirmación
  }

  closeReprogramModal() {
    this.showReprogramModal = false; // Cierra el modal de confirmación
  }

  // Confirmar reprogramación
  confirmReprogram() {
    console.log('Reprogramación confirmada.');
    this.closeReprogramModal(); // Cierra el modal después de confirmar
    this.router.navigate(['/appointments']); // Redirige a la página de citas
  }

  // Reprogramar directamente (función original)
  Reprogramar() {
    this.router.navigate(['/appointments']);
  }
  // Modal de Anulación
  openAnularModal() {
    this.showAnularModal = true;
  }

  closeAnularModal() {
    this.showAnularModal = false;
  }
  confirmAnular() {
    console.log('Cita anulada.');
    this.closeAnularModal(); // Cierra el modal de confirmación
    this.showAnuladaSuccessModal = true; // Abre el modal de éxito
  }

// Modal de Éxito al Anular
closeAnuladaSuccessModal() {
  this.showAnuladaSuccessModal = false;
}
  
}