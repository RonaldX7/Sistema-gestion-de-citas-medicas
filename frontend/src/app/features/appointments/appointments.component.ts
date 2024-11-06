import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SpecialtyService } from '../../core/services/specialty.service';
import { CommonModule } from '@angular/common';
import { DoctorService } from '../../core/services/doctor.service';
import { FormsModule } from '@angular/forms';
import { ScheduleService, Schedule } from '../../core/services/schedule.service';
import { PatientService } from '../../core/services/patient.service';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-appointments',
  templateUrl: './appointments.component.html',
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class AppointmentsComponent implements OnInit {
  showModal = true;
  showConfirmation = false;
  doctors: { id: string; name: string; lastName: string; specialty: string; specialtyId: string; schedule?: string[] }[] = [];
  specialties: any[] = []; // Arreglo para almacenar las especialidades
  selectedSpecialty: string = 'todas'; // con esto guardo la especialidad seleccionada
  selectedDate: string = '2024-11-05'; // fecha por defecto
  selectedDoctor: { id: string; name: string; lastName: string; specialty: string; specialtyId: string; schedule?: string[] } | null = null;
  selectedSchedule: string | null = null; // Almacena el horario seleccionado
  selectedSpecialtyName: string | null = null; // Almacena la especialidad seleccionada
  patientData: any = null;
  patients: {id: string; dni: string; name:string; lasName:string; genderId: string; email: string}[] = [];
  userId: string | null = null;
  constructor(
    private router: Router,
    private specialtyService: SpecialtyService,
    private doctorService: DoctorService,
    private scheduleService: ScheduleService,
    private patientService: PatientService,
    private authService: AuthService
  ) {}


  ngOnInit(): void {
    this.loadSpecialties();
    this.loadDoctors(); // Cargar doctores desde el backend
    this.loadPatientData();
    this.userId = this.authService.getUserId();
    console.log('User ID en AppointmentsComponent:', this.userId);
  }

  loadPatientData(): void {
    this.patientService.getPatientByUserId().subscribe({
      next: (data) => {
        this.patientData = data;
        console.log('Datos del paciente:', this.patientData);
      },
      error: (err) => {
        console.error('Error al cargar los datos del paciente', err);
      }
    });
  }



  loadSpecialties(): void {
    this.specialtyService.getSpecialties().subscribe(
      (data) => {
        this.specialties = data;
      },
      (error) => {
        console.error('Error al cargar especialidades', error);
      }
    );
  }

  loadDoctors(): void {
    this.doctorService.getDoctors().subscribe(
      (data) => {
        this.doctors = data;
        //console.log("Doctores cargados:", this.doctors); // Verifica aquí si specialty está presente
        this.loadSchedulesForDoctors(); // Cargar horarios después de cargar todos los doctores
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
        this.loadSchedulesForDoctors();
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
    if (this.selectedSpecialty === 'todas') {
      this.loadSchedulesForDoctors();
      this.loadDoctors(); // cargo a todos los docs
    } else {
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
        (error) => {
          console.error(`Error al cargar horarios para el doctor ${doctor.id}`, error);
        }
      );
    });
  }

  // Escuchar cambios en la fecha y cargar horarios
  onDateChange(): void {
    this.loadSchedulesForDoctors();
    this.selectedSchedule = null;
  }

  // Seleccionar horario
  onScheduleSelect(time: string, doctor: any): void {
    this.selectedSchedule = time;
    this.selectedDoctor = doctor;
  }

  // Método para confirmar la cita
  confirmAppointment(): void {
    if (this.selectedDoctor && this.selectedSchedule) {
      console.log("Doctor seleccionado:", this.selectedDoctor);
      console.log("Horario seleccionado:", this.selectedSchedule);
      console.log("Especialidad seleccionada:", this.selectedSpecialty);

      // Si la especialidad seleccionada es "todas", asigna el nombre de la especialidad del doctor
      if (this.selectedSpecialty === 'todas') {
        // Usamos specialties[0] para obtener la primera especialidad
        this.selectedSpecialtyName = this.selectedDoctor.specialty || "N/A";
        console.log("Especialidad obtenida del doctor:", this.selectedSpecialtyName);
      } else {
        // Guarda la especialidad seleccionada para la confirmación
        const specialty = this.specialties.find(s => s.id.toString() === this.selectedSpecialty.toString());
        this.selectedSpecialtyName = specialty ? specialty.name : "N/A";
        console.log("Especialidad obtenida de la lista de especialidades:", this.selectedSpecialtyName);
      }

      this.showConfirmation = true;
    } else {
      alert("Por favor, selecciona un doctor y un horario.");
    }
  }

  // Método para enviar la cita
  submitAppointment(): void {
    console.log("Cita confirmada con:", this.selectedDoctor, this.selectedSchedule, this.selectedDate);
  }

  logout(): void {
    localStorage.removeItem('authToken');
    this.router.navigate(['/login']);
  }

  toAppointment(){
    this.showConfirmation = false;
  }

  closeModal(): void {
    this.showModal = false;
  }
}
