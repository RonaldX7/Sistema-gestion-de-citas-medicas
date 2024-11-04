import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SpecialtyService } from '../../core/services/specialty.service';
import { CommonModule } from '@angular/common';
import { DoctorService } from '../../core/services/doctor.service';
import { FormsModule } from '@angular/forms';
import { ScheduleService, Schedule } from '../../core/services/schedule.service';




@Component({
  selector: 'app-appointments',
  templateUrl: './appointments.component.html',
  standalone: true,
  imports: [CommonModule,FormsModule]
})
export class AppointmentsComponent implements OnInit {
  showModal = true;
  doctors: { id:string; name: string; lastName: string; specialty: string; schedule?: string[] }[] = []; // Cambiamos para obtener desde la base de datos
  specialties: any[] = []; // Arreglo para almacenar las especialidades
  selectedSpecialty: string='todas';// con esto guardo la especialidad selecionada
  selectedDate: string = '2024-11-05';//fecha por defecto
  selectedDoctor: string = '';//doctor seleccionado

  constructor(
    private router: Router,
    private specialtyService: SpecialtyService,
    private doctorService: DoctorService,
    private scheduleService: ScheduleService
  ) {}

  ngOnInit(): void {
    this.loadSpecialties();
    this.loadDoctors(); // Cargar doctores desde el backend
  }

  loadSpecialties(): void {
    this.specialtyService.getSpecialties().subscribe(
      (data) => {this.specialties = data;},
      (error) => {console.error('Error al cargar especialidades', error);}
    );
  }

  loadDoctors(): void {
    this.doctorService.getDoctors().subscribe(
      (data) => {
        this.doctors = data;
      },
      (error) => {
        console.error('Error al cargar doctores', error);
      }
    );
  }

  // Método para cargar doctores basados en la especialidad seleccionada
  loadDoctorsBySpecialty(specialtyId: string): void {
      this.doctorService.getDoctorsforSpecialty(specialtyId).subscribe(
        (data) => {
          this.doctors = data;
        },
        (error) => {
          console.error('Error al cargar doctores por especialidad', error);
        }
      );
    }
  
    // Método que se ejecutará cuando cambie la especialidad seleccionada
  onSpecialtyChange(event: Event): void {
      const selectElement = event.target as HTMLSelectElement;
      this.selectedSpecialty = selectElement.value;
      if(this.selectedSpecialty === 'todas'){
        this.loadDoctors();//cargo a todos los docs
      }else{
        this.loadDoctorsBySpecialty(this.selectedSpecialty); // Llama al método para cargar los doctores filtrados
      }
    }

    loadSchedulesForDoctors(): void {
      this.doctors.forEach((doctor) => {
        const formattedDate = new Date(this.selectedDate).toISOString().split('T')[0];
        this.scheduleService.getScheduleForDoctor(doctor.id, formattedDate).subscribe(
          (schedules: Schedule[]) => {
            const availableSchedules = schedules
              .filter(schedule => schedule.isAvailable)
              .map(schedule => `${schedule.startHour} - ${schedule.endHour}`);
            doctor.schedule = availableSchedules.length > 0 ? availableSchedules : ['Sin horario disponible'];
          },
          (error) => { console.error(`Error al cargar horarios para el doctor ${doctor.id}`, error); }
        );
      });
    }

  logout(): void {
    localStorage.removeItem('authToken');
    this.router.navigate(['/login']);
  }

  closeModal(): void {
    this.showModal = false;
  }
}
