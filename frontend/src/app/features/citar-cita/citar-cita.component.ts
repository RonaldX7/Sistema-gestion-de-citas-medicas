import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common'; // Importa CommonModule

@Component({
  selector: 'app-citar-cita',
  standalone: true,
  imports: [CommonModule], // Asegúrate de incluir CommonModule aquí
  templateUrl: './citar-cita.component.html',
  styles: []
})
export class CitarCitaComponent {
  showProfileModal = false; // Controla la visibilidad del modal de perfil clínico
  showRecipeModal = false; // Controla la visibilidad del modal de receta
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

  history() {
    this.router.navigate(['/medical-history']);
  }

  // Abre el modal de perfil clínico con información específica
  openProfileModal(patientName: string) {
    this.selectedPatient = patientName;
    this.showProfileModal = true;
  }

  // Cierra el modal de perfil clínico
  closeProfileModal() {
    this.showProfileModal = false;
    this.selectedPatient = ''; // Limpia los datos del paciente seleccionado
  }

  // Abre el modal de receta
  openRecipeModal(patientName: string) {
    this.selectedPatient = patientName;
    this.showRecipeModal = true;
  }

  // Cierra el modal de receta
  closeRecipeModal() {
    this.showRecipeModal = false;
    this.selectedPatient = ''; // Limpia los datos del paciente seleccionado
  }

  // Guarda la receta (este método se puede personalizar para el backend)
  saveRecipe() {
    console.log('Receta guardada para el paciente: ', this.selectedPatient);
    this.closeRecipeModal(); // Cierra el modal después de guardar
  }
}
