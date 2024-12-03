import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AppointmentService } from '../../../../core/services/appointment.service';
import { PatientService } from '../../../../core/services/patient.service';
import { ScheduleService, Schedule } from '../../../../core/services/schedule.service';
import { DoctorService } from '../../../../core/services/doctor.service';

@Component({
  selector: 'app-appointments-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './appointments-list.component.html',
  styles: ``
})
export class AppointmentsListComponent implements OnInit {

  showMisCitas: boolean = true;
  showMiHistorial: boolean = false;
  showModal: boolean = false;
  showReprogramModal: boolean = false; // Modal de confirmación para reprogramar
  showAnularModal: boolean = false; // Modal de anulación
  showAnuladaSuccessModal: boolean = false; // Modal de éxito tras anulación

  
  patientId: string =' ';
  patient: { id: string; dni: string; name: string; lastName: string; genderId:string; email: string;  } = {id:'',dni: '',name: '',lastName: '',genderId:'',email: ''};
  
  citas: { id: string; doctorName: string; specialtyName: string; date: string; patientId: string; doctorId:string ;startTime: string;endTime: string;cost: any; statusId: string; status: string; }[] = [];
  cita:{id: string; date: string; patientId: string; doctorId:string ;startTime: string;endTime: string;cost: any; statusId: string;}=
  {id:'', date:'', patientId:'', doctorId:'', startTime:'', endTime:'', cost:'',statusId:''};
  
  doctors: { id: string; name: string; lastName: string; specialties: string; specialtyId: string; schedule?: string[];  scheduleObjects?: Schedule[]; }[] = [];

  constructor(
    private router: Router,
    private patientService: PatientService,
    private appointmentService:AppointmentService,
    private doctorService:DoctorService,
    private scheduleService:ScheduleService
  ){}

  ngOnInit(): void{
    console.clear();
    this.loadPatientData();
    this.loadDoctors();
    //console.log(this.cita);
  }

  //Cargar data del paciente
  loadPatientData(): void {
    this.patientService.getPatientByUserId().subscribe({
      next: (data) => {
        this.patient = data[0];
        console.log('Datos del paciente:', this.patient);
        this.patientId=this.patient.id;
        // console.log("ID para buscar:" + this.patientId);
        // console.log("ID que se paso:" + this.patient.id);
        
        //Cargando data de la cita despues de cargar el paciente
        this.loadAppoByPattientId();

      },
      error: (err) => {
        console.error('Error al cargar los datos del paciente', err);
      }
    });
  }
  //Cargar data de la cita por ID del paciente
  loadAppoByPattientId(): void{
    console.log("Id llegando a funcion: " + this.patientId)
    this.appointmentService.getCitasByPatientId(this.patientId).subscribe(
      (data) => {
        this.citas=data;
        this.addDoctorDetailsToAppointments();
        console.log('Datos cita cargada: ' + this.citas);
      },
      (error) => {
        console.error('Error al cargar las citas', error);
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


  addDoctorDetailsToAppointments(): void {
    this.citas.forEach(cita => {
      const doctor = this.doctors.find(doctor => doctor.id === cita.doctorId);
      if (doctor) {
        // Añadir nombre completo y especialidad a la cita
        cita.doctorName = `${doctor.name} ${doctor.lastName}`;
        cita.specialtyName = doctor.specialties;
      } else {
        // Si no se encuentra el doctor, dejamos los campos vacíos
        cita.doctorName = 'Doctor no encontrado';
        cita.specialtyName = 'Especialidad no disponible';
      }
    });
}

  loadSchedulesForDoctors(): void {
   
    this.doctors.forEach((doctor) => {
      this.scheduleService.getScheduleForDoctor(doctor.id).subscribe(
        (schedules: Schedule[]) => {
          //console.log(`Horarios para el doctor ${doctor.id}:`, schedules); // Verifica la respuesta de la API
  
          // Mantén los objetos originales para buscar después el scheduleId
          doctor.scheduleObjects = schedules.filter(schedule => schedule.isAvailable);
          //console.log(`scheduleObjects para el doctor ${doctor.id}:`, doctor.scheduleObjects);
          // Transforma los horarios en formato legible
          const availableSchedules = doctor.scheduleObjects.map(
            (schedule) => `${this.formatHour(schedule.startHour)} - ${this.formatHour(schedule.endHour)}`
          );
  
          // Asigna los horarios legibles al doctor
          doctor.schedule = availableSchedules.length > 0 ? availableSchedules : ['Sin horario disponible'];
        },
        (error) => {
          console.error(`Error al cargar horarios para el doctor ${doctor.id}`, error);
        }
      );
    });
    }
  
  formatHour(hour: string): string {
      // Asume que `hour` está en formato "HH:mm:ss" y corta los segundos
      return hour.slice(0, 5); // Devuelve "HH:mm"
  }
  

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