import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AppointmentService } from '../../../../core/services/appointment.service';

@Component({
  selector: 'app-list-citas',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './list-citas.component.html',
})
export class ListCitasComponent {
  
  constructor(private appointmentService:AppointmentService){}
  searchTerm: string = '';
  searchDate: string = '';
  searchSpecialty: string = '';
  
  specialties = ['Dermatología', 'Cardiología', 'Oftalmología', 'Pediatría', 'Todas'];

  citas = [
    { id: '0012', dni: '08052697', nombre: 'Julio Cesar Medrano Ossco', especialidad: 'Dermatología', fecha: '2024-09-20', hora: '12:30 PM', estado: 'Atendido' },
    { id: '0013', dni: '08052697', nombre: 'Julio Cesar Medrano Ossco', especialidad: 'Cardiología', fecha: '2024-09-30', hora: '01:30 PM', estado: 'Atendido' },
    { id: '0014', dni: '54632598', nombre: 'Luz Yamile Vasquez Rojas', especialidad: 'Oftalmología', fecha: '2024-10-19', hora: '01:50 PM', estado: 'Atendido' },
    { id: '0015', dni: '80203694', nombre: 'Iliana Yeaneth Soto Bustamante', especialidad: 'Pediatría', fecha: '2024-10-27', hora: '03:45 PM', estado: 'En espera' },
    { id: '0016', dni: '54632598', nombre: 'Luz Yamile Vasquez Rojas', especialidad: 'Oftalmología', fecha: '2024-10-27', hora: '05:00 PM', estado: 'En espera' }
  ];

  filteredCitas = [...this.citas];
  selectedCita: any = null;

  ngOnInit() {
    const today = new Date().toISOString().split('T')[0]; // Obtener la fecha actual en formato yyyy-MM-dd
    this.searchDate = today;
    this.filterCitas(); // Filtrar citas para la fecha actual al cargar la página
  }
  onDateSelection(event: any) {
  const selectedDate = new Date(event.year, event.month - 1, event.day);
  this.searchDate = selectedDate.toISOString().split('T')[0]; // Formato yyyy-MM-dd
  this.filterCitas();
}


  filterCitas() {
    const term = this.searchTerm.toLowerCase();
    this.filteredCitas = this.citas.filter((cita) => {
      const matchesDate = this.searchDate ? cita.fecha === this.searchDate : true;
      const matchesSpecialty = this.searchSpecialty ? (this.searchSpecialty === 'Todas' || cita.especialidad === this.searchSpecialty) : true;
      const matchesTerm = 
        cita.dni.toLowerCase().includes(term) ||
        cita.nombre.toLowerCase().includes(term) ||
        cita.hora.toLowerCase().includes(term) ||
        cita.estado.toLowerCase().includes(term) ||
        cita.especialidad.toLowerCase().includes(term);

      return matchesDate && matchesSpecialty && matchesTerm;
    });
  }

  verCita(cita: any) {
    this.selectedCita = cita;
  }

  volver() {
    this.selectedCita = null;
  }
}
