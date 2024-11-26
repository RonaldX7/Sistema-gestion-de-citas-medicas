import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SpecialtyService } from '../../../../core/services/specialty.service';
import { CommonModule } from '@angular/common';
import { DoctorService } from '../../../../core/services/doctor.service';
import { FormsModule } from '@angular/forms';
import { ScheduleService, Schedule } from '../../../../core/services/schedule.service';
import { PatientService } from '../../../../core/services/patient.service';
import { AuthService } from '../../../../core/services/auth.service';
import { AppointmentService } from '../../../../core/services/appointment.service';
@Component({
  selector: 'app-appointments',
  templateUrl: './appointments.component.html',
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class AppointmentsComponent implements OnInit {
  showModal = true;
  showConfirmation = false;
  doctors: { id: string; name: string; lastName: string; specialties: string; specialtyId: string; schedule?: string[] }[] = [];
  patient: { id: string; dni: string; name: string; lastName: string; genderId:string; email: string;  } = {id:'',dni: '',name: '',lastName: '',genderId:'',email: ''};
  specialties: any[] = []; // Arreglo para almacenar las especialidades
  selectedSpecialty: string = 'todas'; // con esto guardo la especialidad seleccionada
  selectedDate: string = ''; // fecha por defecto
  selectedDoctor: { id: string; name: string; lastName: string; specialties: string; specialtyId: string; schedule?: string[] } | null = null;
  selectedSchedule: string | null = null; // Almacena el horario seleccionado
  selectedSpecialtyName: string | null = null; // Almacena la especialidad seleccionada


   // Variables para almacenar los datos e IDs necesarios
 userId: string | null = null;
 specialtyId: string = ''; // ID de la especialidad seleccionada
 doctorId: string = ''; // ID del doctor seleccionado
 scheduleId: number | null = null; // ID del horario seleccionado
 statusId: number=1;


  constructor(
    private router: Router,
    private specialtyService: SpecialtyService,
    private doctorService: DoctorService,
    private scheduleService: ScheduleService,
    private patientService: PatientService,
    private authService: AuthService,
    private appointmentService: AppointmentService
  ) {}
  searchTerm: string = '';
  searchDate: string = '';
  searchSpecialty: string = '';


  ngOnInit(): void {
    const today = new Date().toISOString().split('T')[0];
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

  // onDateSelection(event: any) {
  //   const selectedDate = new Date(event.year, event.month - 1, event.day);
  //   this.searchDate = selectedDate.toISOString().split('T')[0]; // Formato yyyy-MM-dd
  //   }


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

  // Método para cargar doctores basados en la especialidad seleccionada
  loadDoctorsBySpecialty(specialtyId: string): void {
    this.doctorService.getDoctorsforSpecialty(specialtyId).subscribe(
      (data) => {
        this.doctors = data;
        console.log("Doctores cargados por:", this.doctors);
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
      //const formattedDate = new Date(this.selectedDate).toISOString().split('T')[0];
      this.scheduleService.getScheduleForDoctor(doctor.id).subscribe(
        (schedules: Schedule[]) => {
          console.log(`Horarios para el doctor ${doctor.id}:`, schedules);// Verifica aquí la respuesta de la API
          const availableSchedules = schedules
            .filter(schedule => schedule.isAvailable)
            .map(schedule => `${this.formatHour(schedule.startHour)} - ${this.formatHour(schedule.endHour)}`);
            //.map(schedule => `${this.formatHour(schedule.startHour)} - ${this.formatHour(schedule.endHour)}`);
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
    console.log('Fecha seleccionada:', this.selectedDate);
    this.loadSchedulesForDoctors();
    this.selectedSchedule = null;
  }

  // Seleccionar horario
  onScheduleSelect(time: string, doctor: any): void {
    this.selectedSchedule = time;
    this.selectedDoctor = doctor;
  }

  // Método para confirmar la cita antes de enviarla
confirmAppointment(): void {
  if (this.selectedDoctor && this.selectedSchedule) {
    console.log("Doctor seleccionado:", this.selectedDoctor);
    console.log("Horario seleccionado:", this.selectedSchedule);
    console.log("Especialidad seleccionada:", this.selectedSpecialty);
    console.log("Paciente seleccionado:", this.patient);

    // Si la especialidad seleccionada es "todas", asigna el nombre de la especialidad del doctor
    if (this.selectedSpecialty === 'todas') {
      this.selectedSpecialtyName = this.selectedDoctor.specialties || "N/A";
    } else {
      const specialty = this.specialties.find(s => s.id.toString() === this.selectedSpecialty.toString());
      this.selectedSpecialtyName = specialty ? specialty.name : "N/A";
    }

    this.showConfirmation = true; // Mostrar vista de confirmación
  } else {
    alert("Por favor, selecciona un doctor y un horario.");
  }
}

  // Método para confirmar la cita
  submitAppointment(): void {
    if (!this.selectedDoctor || !this.selectedDate) {
      console.error("Doctor o fecha no seleccionados.");
      alert("Por favor, selecciona un doctor y una fecha.");
      return;
    }
  
    // Llama a fetchScheduleId para obtener el scheduleId
    this.fetchScheduleId(this.selectedDoctor.id).then(() => {
      if (!this.scheduleId) {
        console.error("No se ha obtenido un scheduleId válido.");
        alert("Error al obtener el ID del horario. Intenta de nuevo.");
        return;
      }
  
      // Construir el objeto con los datos necesarios para la cita
      const userData = {
        
        date:this.selectedDate,
        patientId: this.patient.id, // ID del paciente
        specialtyId: this.selectedSpecialty, // ID de la especialidad seleccionada
        doctorId: this.selectedDoctor?.id, // ID del doctor seleccionado
        scheduleId: this.scheduleId, // ID del horario obtenido
        statusId:this.statusId=1
      };
  
      console.log('Datos de la cita a enviar:', userData);
  
      // Llamar al servicio para registrar la cita
      this.appointmentService.appointment(userData).subscribe({
        next: (response) => {
          console.log('Cita registrada exitosamente:', response);
          alert('Cita registrada con éxito');
          this.showConfirmation = false; // Regresar a la pantalla principal
        },
        error: (err) => {
          console.error('Error al registrar la cita:', err);
          alert('Error al registrar la cita');
        }
      });
    });
  }
  
  // Modifica fetchScheduleId para que retorne una Promesa
  fetchScheduleId(doctorId: string): Promise<void> {
    return new Promise((resolve) => {
      this.scheduleService.getScheduleId(doctorId).subscribe({
        next: (id) => {
          this.scheduleId = id;
          console.log('Schedule ID obtenido:', this.scheduleId);
          resolve();
        },
        error: (err) => {
          console.error('Error al obtener el Schedule ID:', err);
          resolve(); // Resolver la promesa incluso en caso de error
        }
      });
    });
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

  formatHour(hour: string): string {
    // Asume que `hour` está en formato "HH:mm:ss" y corta los segundos
    return hour.slice(0, 5); // Devuelve "HH:mm"
  }

  
  
}
