import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-list-citas',
  standalone: true,
  imports: [FormsModule, CommonModule], // Aquí importamos CommonModule
  templateUrl: './list-citas.component.html',
})
export class ListCitasComponent {
  searchTerm: string = '';
  citas = [
    { 
      id: '0012',
      dni: '08052697',
      nombre: 'Julio Cesar Medrano Ossco',
      especialidad: 'Dermatología',
      fecha: '20/09/24',
      hora: '12:30 PM',
      estado: 'Atendido'
    },
    {
      id: '0013',
      dni: '08052697',
      nombre: 'Julio Cesar Medrano Ossco',
      especialidad: 'Cardiología',
      fecha: '30/09/24',
      hora: '01:30 PM',
      estado: 'Atendido'
    },
    {
      id: '0014',
      dni: '54632598',
      nombre: 'Luz Yamile Vasquez Rojas',
      especialidad: 'Oftalmología',
      fecha: '19/10/24',
      hora: '01:50 PM',
      estado: 'Atendido'
    },
    {
      id: '0015',
      dni: '80203694',
      nombre: 'Iliana Yeaneth Soto Bustamante',
      especialidad: 'Pediatría',
      fecha: '27/10/24',
      hora: '03:45 PM',
      estado: 'En espera'
    },
    {
      id: '0016',
      dni: '54632598',
      nombre: 'Luz Yamile Vasquez Rojas',
      especialidad: 'Oftalmología',
      fecha: '27/10/24',
      hora: '05:00 PM',
      estado: 'En espera'
    }
  ];

  filteredCitas = [...this.citas];

  selectedCita: any = null;

  filterCitas() {
    const term = this.searchTerm.toLowerCase();
    this.filteredCitas = this.citas.filter(
      (cita) =>
        cita.dni.toLowerCase().includes(term) ||
        cita.nombre.toLowerCase().includes(term) ||
        cita.fecha.toLowerCase().includes(term) ||
        cita.hora.toLowerCase().includes(term) ||
        cita.estado.toLowerCase().includes(term) ||
        cita.especialidad.toLowerCase().includes(term)
    );
  }

  verCita(cita: any) {
    this.selectedCita = cita;
  }

  volver() {
    this.selectedCita = null;
  }
}
