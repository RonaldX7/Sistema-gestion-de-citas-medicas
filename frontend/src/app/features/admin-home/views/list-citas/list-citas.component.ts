import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AppointmentService } from '../../../../core/services/appointment.service';
import { Schedule, ScheduleService } from '../../../../core/services/schedule.service';
import { PatientService } from '../../../../core/services/patient.service';

@Component({
  selector: 'app-list-citas',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './list-citas.component.html',
})
export class ListCitasComponent implements OnInit {
  
  constructor(private appointmentService:AppointmentService, private scheduleService:ScheduleService,private patientService:PatientService){}
  selectedDate: string = ''; // fecha por defecto
  
  specialties = ['Dermatología', 'Cardiología', 'Oftalmología', 'Pediatría', 'Todas'];

  citas: { id: string; doctorId:string; doctorName: string; specialtyName: string; date: string; patientId: string; dni: string; name: string; lastName:string; startTime: string;endTime: string;cost: any; statusId: string; status: string; }[] = [];
  doctors: { id: string; name: string; lastName: string; specialties: string; specialtyId: string; schedule?: string[];  scheduleObjects?: Schedule[]; }[] = [];
  patients: {id: string; dni:string; name:string; lastName: string}[]=[]
  // citas = [
  //   { id: '0012', dni: '08052697', nombre: 'Julio Cesar Medrano Ossco', especialidad: 'Dermatología', fecha: '2024-09-20', hora: '12:30 PM', estado: 'Atendido' },
  //   { id: '0013', dni: '08052697', nombre: 'Julio Cesar Medrano Ossco', especialidad: 'Cardiología', fecha: '2024-09-30', hora: '01:30 PM', estado: 'Atendido' },
  //   { id: '0014', dni: '54632598', nombre: 'Luz Yamile Vasquez Rojas', especialidad: 'Oftalmología', fecha: '2024-10-19', hora: '01:50 PM', estado: 'Atendido' },
  //   { id: '0015', dni: '80203694', nombre: 'Iliana Yeaneth Soto Bustamante', especialidad: 'Pediatría', fecha: '2024-10-27', hora: '03:45 PM', estado: 'En espera' },
  //   { id: '0016', dni: '54632598', nombre: 'Luz Yamile Vasquez Rojas', especialidad: 'Oftalmología', fecha: '2024-10-27', hora: '05:00 PM', estado: 'En espera' }
  // ];

  filteredCitas = [...this.citas];
  selectedCita: any = null;

  //para la fecha actualizada
  searchTerm: string = '';
  searchDate: string = '';
  searchSpecialty: string = '';

  ngOnInit() {

    this.loadAppointments();
    this.loadPatients();


     //Para la fecha actual
     const todayDate = new Date();
     const year = todayDate.getFullYear();
     const month = String(todayDate.getMonth() + 1).padStart(2, '0'); // Mes en formato 2 dígitos
     const day = String(todayDate.getDate()).padStart(2, '0'); // Día en formato 2 dígitos
 
     this.selectedDate = `${year}-${month}-${day}`;
     //this.filterCitas(); // Filtrar citas para la fecha actual al cargar la página
  }

  loadPatients(): void{
    this.patientService.getPatients().subscribe(
        (data)=>{
          this.patients=data;
          this.patients.forEach((patient) =>{
            console.log(patient.id, patient.dni,patient.name,patient.lastName)
          }
          );
        },
        (error)=>{
          console.error('No se cargaron pacientes',error);
        }
    );
  }


  loadAppointments(): void{
    this.appointmentService.getCitas().subscribe(
      (data) => {
        this.citas=data;
        this.addDoctorDetailsToAppointments();
        this.citas.forEach((cita) => {
          console.log(cita.dni);
        });
      },
      (error) => {
        console.error('Error al cargar las citas', error);
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




  onDateSelection(event: any) {
  const selectedDate = new Date(event.year, event.month - 1, event.day);
  this.searchDate = selectedDate.toISOString().split('T')[0]; // Formato yyyy-MM-dd
  //this.filterCitas();
  }


  filterCitas() {
    // const term = this.searchTerm.toLowerCase();
    // this.filteredCitas = this.citas.filter((cita) => {
    //   const matchesDate = this.searchDate ? cita.fecha === this.searchDate : true;
    //   const matchesSpecialty = this.searchSpecialty ? (this.searchSpecialty === 'Todas' || cita.especialidad === this.searchSpecialty) : true;
    //   const matchesTerm = 
    //     cita.dni.toLowerCase().includes(term) ||
    //     cita.nombre.toLowerCase().includes(term) ||
    //     cita.hora.toLowerCase().includes(term) ||
    //     cita.estado.toLowerCase().includes(term) ||
    //     cita.especialidad.toLowerCase().includes(term);

    //   return matchesDate && matchesSpecialty && matchesTerm;
    // });
  }

  verCita(cita: any) {
    this.selectedCita = cita;
  }

  volver() {
    this.selectedCita = null;
  }

  formatHour(hour: string): string {
    // Asume que `hour` está en formato "HH:mm:ss" y corta los segundos
    return hour.slice(0, 5); // Devuelve "HH:mm"
}
}
