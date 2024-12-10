import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SpecialtyService } from '../../core/services/specialty.service';
import { CommonModule } from '@angular/common';
import { DoctorService } from '../../core/services/doctor.service';
import { FormsModule } from '@angular/forms';
import { ScheduleService, Schedule } from '../../core/services/schedule.service';
import { PatientService } from '../../core/services/patient.service';
import { AuthService } from '../../core/services/auth.service';
import { AppointmentService } from '../../core/services/appointment.service';
import { SidebarComponent } from '../sidebar/sidebar.component';
@Component({
  selector: 'app-appointments',
  templateUrl: './appointments.component.html',
  standalone: true,
  imports: [CommonModule, FormsModule, SidebarComponent]
})
export class AppointmentsComponent implements OnInit {
  showModal = false; // Controla la visibilidad del modal
  errorMessage = ''; // Mensaje de error dinámico
  showConfirmation = false;

  doctors: { id: string; name: string; lastName: string; specialty: string; specialtyId: string; schedule?: string[] }[] = [];
  patient: { id: string; dni: string; name: string; lastName: string; genderId: string; email: string } = {
    id: '', dni: '', name: '', lastName: '', genderId: '', email: ''
  };

  specialties: any[] = []; // Arreglo para almacenar las especialidades
  selectedSpecialty: string = 'todas'; // con esto guardo la especialidad seleccionada
  selectedDate: string = ''; // fecha por defecto
  selectedDoctor: { id: string; name: string; lastName: string; specialty: string; specialtyId: string; schedule?: string[] } | null = null;
  selectedSchedule: string | null = null; // Almacena el horario seleccionado
  selectedSpecialtyName: string | null = null; // Almacena la especialidad seleccionada


// Variables para almacenar los datos e IDs necesarios
 userId: string | null = null;
 specialtyId: string = ''; // ID de la especialidad seleccionada
 doctorId: string = ''; // ID del doctor seleccionado
 scheduleId: number | null = null; // ID del horario seleccionado


  constructor(
    private router: Router,
    private specialtyService: SpecialtyService,
    private doctorService: DoctorService,
    private scheduleService: ScheduleService,
    private patientService: PatientService,
    private authService: AuthService,
    private appointmentService: AppointmentService
  ) {}

  ngOnInit(): void {
    this.loadSpecialties();
    this.loadDoctors(); // Cargar doctores desde el backend
    this.userId = this.authService.getUserId();
    this.loadPatientData();
    console.log('User ID en AppointmentsComponent:', this.userId);
    
  //Para la fecha actual
  const todayDate = new Date();
  const year = todayDate.getFullYear();
  const month = String(todayDate.getMonth() + 1).padStart(2, '0'); // Mes en formato 2 dígitos
  const day = String(todayDate.getDate()).padStart(2, '0'); // Día en formato 2 dígitos

  this.selectedDate = `${year}-${month}-${day}`;
    
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
        this.loadSchedulesForDoctors(); // Cargar horarios después de cargar todos los doctores
      },
      (error) => {
        console.error('Error al cargar doctores', error);
      }
    );
  }

  loadPatientData(): void {
    this.patientService.getPatientByUserId().subscribe({
      next: (data) => {
        this.patient = data[0];
        console.log('Datos del paciente:', this.patient);
      },
      error: (err) => {
        console.error('Error al cargar los datos del paciente', err);
      }
    });
  }

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

  onSpecialtyChange(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    this.selectedSpecialty = selectElement.value;
    if (this.selectedSpecialty === 'todas') {
      this.loadSchedulesForDoctors();
      this.loadDoctors(); // Cargo todos los doctores
    } else {
      this.loadDoctorsBySpecialty(this.selectedSpecialty);
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

  onDateChange(): void {
    this.loadSchedulesForDoctors();
    this.selectedSchedule = null;
  }

  onScheduleSelect(time: string, doctor: any): void {
    this.selectedSchedule = time;
    this.selectedDoctor = doctor;
  }

  confirmAppointment(): void {
    if (this.selectedDoctor && this.selectedSchedule) {
      if (this.selectedSpecialty === 'todas') {
        this.selectedSpecialtyName = this.selectedDoctor.specialty || "N/A";
      } else {
        const specialty = this.specialties.find(s => s.id.toString() === this.selectedSpecialty.toString());
        this.selectedSpecialtyName = specialty ? specialty.name : "N/A";
      }
      this.showConfirmation = true;
    } else {
      this.showError("Por favor, selecciona un doctor y un horario.");
    }
  }

  submitAppointment(): void {
    if (!this.selectedDoctor || !this.selectedDate) {
      this.showError("Por favor, selecciona un doctor y una fecha.");
      return;
    }

    this.fetchScheduleId(this.selectedDoctor.id, this.selectedDate).then(() => {
      if (!this.scheduleId) {
        this.showError("Error al obtener el ID del horario. Intenta de nuevo.");
        return;
      }

      const userData = {
        patientId: this.patient.id,
        specialtyId: this.selectedSpecialty,
        doctorId: this.selectedDoctor?.id,
        scheduleId: this.scheduleId
      };

      this.appointmentService.appointment(userData).subscribe({
        next: (response) => {
          console.log('Cita registrada exitosamente:', response);
          alert('Cita registrada con éxito');
          this.showConfirmation = false;
        },
        error: (err) => {
          console.error('Error al registrar la cita:', err);
          this.showError('Error al registrar la cita. Intenta nuevamente.');
        }
      });
    });
  }

  fetchScheduleId(doctorId: string, date: string): Promise<void> {
    return new Promise((resolve) => {
      this.scheduleService.getScheduleId(doctorId, date).subscribe({
        next: (id) => {
          this.scheduleId = id;
          resolve();
        },
        error: (err) => {
          console.error('Error al obtener el Schedule ID:', err);
          resolve();
        }
      });
    });
  }

  logout(): void {
    localStorage.removeItem('authToken');
    this.router.navigate(['/login']);
  }

  toAppointment(): void {
    this.showConfirmation = false;
  }

  showError(message: string): void {
    this.errorMessage = message;
    this.showModal = true;
  }

  closeModal(): void {
    this.showModal = false;
  }

  PatientHome() {
    this.router.navigate(['/patient-home']);
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

