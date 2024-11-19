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
  
}
