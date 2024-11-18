import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common'; // Importa CommonModule

@Component({
  selector: 'app-citar-cita',
  standalone: true,
  imports: [CommonModule], // Asegúrate de incluir CommonModule aquí
  templateUrl: './citar-cita.component.html',
  styles: ``
})
export class CitarCitaComponent {
  showModal = false; // Controla la visibilidad del modal
  selectedPatient = ''; // Para mostrar información específica del paciente

  constructor(private router: Router) {}

  regreso() {
    this.router.navigate(['/login']);
  }

  cuenta() {
    this.router.navigate(['/account']);
  }

  doctor_home() {
    this.router.navigate(['/doctor-home']);
  }

  history(){
    this.router.navigate(['/medical-history'])
  }

  // Abre el modal con información específica
  openModal(patientName: string) {
    this.selectedPatient = patientName;
    this.showModal = true;
  }

  // Cierra el modal
  closeModal() {
    this.showModal = false;
    this.selectedPatient = ''; // Limpia los datos del paciente seleccionado
  }
}
