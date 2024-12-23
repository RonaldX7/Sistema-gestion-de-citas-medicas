import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AppointmentService } from '../../../../core/services/appointment.service';
import { PatientService } from '../../../../core/services/patient.service';
import { ScheduleService, Schedule } from '../../../../core/services/schedule.service';
import { DoctorService } from '../../../../core/services/doctor.service';
import { AppointmentsComponent } from "../appointments/appointments.component";
import Swal from 'sweetalert2';

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
  showReprogramModal2: boolean =false;
  showAnularModal: boolean = false; // Modal de anulación
  showAnuladaSuccessModal: boolean = false; // Modal de éxito tras anulación

  newDoctor = {
    name:'',
    lastName:'',
    phone: '',
    email: '',
    username:'',
    password:'',
    cmp:'',
    specialty: '',
    schedulesIds: [] as number[],
    roleId: 3
  };

  selectedDate: string = '';
  patientId: string =' ';
  patient: { id: string; dni: string; name: string; lastName: string; genderId:string; email: string;  } = {id:'',dni: '',name: '',lastName: '',genderId:'',email: ''};
  
  citas: { id: string; doctorName: string; specialtyName: string; date: string; patientId: string; doctorId:string ;startTime: string;endTime: string;cost: any; statusId: string; status: string; }[] = [];
  cita:{id: string; date: string; patientId: string; doctorId:string ;startTime: string;endTime: string;cost: any; statusId: string;}=
  {id:'', date:'', patientId:'', doctorId:'', startTime:'', endTime:'', cost:'',statusId:''};
  citasProgramadas: any[] = [];
  citasCompletadas: any[] = [];
  schedules:any[]=[];
  selectedScheduleId: number | null = null; // ID del horario seleccionado
  selectedAppointmentId: string = '';
  selectedCita: any = null;

  
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
    this.loadSchedules();
    //console.log(this.cita);


      //Para la fecha actual
      const todayDate = new Date();
      const year = todayDate.getFullYear();
      const month = String(todayDate.getMonth() + 1).padStart(2, '0'); // Mes en formato 2 dígitos
      const day = String(todayDate.getDate()).padStart(2, '0'); // Día en formato 2 dígitos
  
      this.selectedDate = `${year}-${month}-${day}`;
  
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

  filterCitas(): void {
    this.citasProgramadas = [];
    this.citasCompletadas = [];
  
    for (const cita of this.citas) {
      if (Number(cita.statusId) === 1) {
        this.citasProgramadas.push(cita);
      } else if (Number(cita.statusId) === 2) {
        this.citasCompletadas.push(cita);
      }
    }
    //console.log('Citas Programadas:', this.citasProgramadas);
    //console.log('Citas Completadas:', this.citasCompletadas);
  }

  //Cargar data de la cita por ID del paciente
  loadAppoByPattientId(): void{
    console.log("Id llegando a funcion: " + this.patientId)
    this.appointmentService.getCitasByPatientId(this.patientId).subscribe(
      (data) => {
        this.citas=data;
        this.addDoctorDetailsToAppointments();
        this.citas.forEach((cita) => {
          //console.log(`Cita ID: ${cita.id}, Status ID: ${cita.statusId}, Tipo de Status ID: ${typeof cita.statusId}`);
        });
        this.filterCitas();

      //console.log('Citas Programadas:', this.citasProgramadas);
      //console.log('Citas Completadas:', this.citasCompletadas);

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

    loadSchedules(): void {
      this.scheduleService.getSchedules().subscribe(
        (data) => {
          console.log('Horarios cargados:', data);
          this.schedules = data;
        },
        (error) => {
          console.error('Error al cargar horarios', error);
        }
      );
    }

  toggleScheduleSelection(scheduleId: number, event: Event): void {
    const isChecked = (event.target as HTMLInputElement).checked;
    if (isChecked) {
      // Si el checkbox está marcado, deseleccionar todos los demás horarios
      this.newDoctor.schedulesIds = [scheduleId];
    } else {
      // Si el checkbox está desmarcado, limpiar la selección
      this.newDoctor.schedulesIds = [];
    }
  }
  
  formatHour(hour: string): string {
      // Asume que `hour` está en formato "HH:mm:ss" y corta los segundos
      return hour.slice(0, 5); // Devuelve "HH:mm"
  }
  

  logout(): void {
    //localStorage.removeItem('authToken');
    this.router.navigate(['/login']);
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


reprogramarCita(appointmentId: string): void {
  if (!this.selectedDate || !this.selectedScheduleId) {
    alert('Por favor, selecciona una fecha y un horario.');
    return;
  }

  const appointmentData = {
    date: this.selectedDate,
    scheduleId: this.selectedScheduleId
  };

  this.appointmentService.reprogramarCita(appointmentId, appointmentData).subscribe({
    // next: (response) => {
    //   console.log('Cita reprogramada con éxito:', response);
    //   alert('Cita reprogramada con éxito.');
    //   this.cerrarReprogramModal();
    //   this.loadAppoByPattientId(); // Recargar las citas actualizadas
    // },
    // error: (err) => {
    //   console.error('Error al reprogramar la cita:', err);
    //   alert('Hubo un error al reprogramar la cita.');
    // }

    next: () => {
      Swal.fire({
        icon: 'success',
        title: 'Registro exitoso',
        text: 'Cita reprogramada con éxito.',
        showConfirmButton: true,
        confirmButtonText: 'Cerrar',
        confirmButtonColor: '#3085d6'
      }).then(() => {
        
        this.showReprogramModal2=false;
        this.loadAppoByPattientId(); 
        //this.router.navigate(['/patient-features/appointments-list']);
      });
    },
    error: (err) => {
      Swal.fire({
        icon: 'error',
        title: 'Error en el registro',
        text: err.error?.message || 'Hubo un problema al reprogramar su cita.',
        confirmButtonText: 'Cerrar'
      });
    }


  });
}

selectCita(cita: any): void {
  this.selectedCita = cita;
  this.abrirReprogramModal(cita.id);
  console.log('Cita seleccionada:', this.selectedCita); // Para verificar que la cita seleccionada es correcta
}


  abrirReprogramModal(appointmentId: string) {
    this.selectedAppointmentId = appointmentId;
    this.showReprogramModal2 = true; // Abre el modal de confirmación
  }

  cerrarReprogramModal() {
    this.showReprogramModal2 = false; // Cierra el modal de confirmación
  }
  
}