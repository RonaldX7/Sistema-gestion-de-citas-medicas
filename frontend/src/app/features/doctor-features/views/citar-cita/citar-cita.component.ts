import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common'; // Importa CommonModule
import { FormsModule } from '@angular/forms';
import { AppointmentService } from '../../../../core/services/appointment.service';
import { PatientService } from '../../../../core/services/patient.service';
import { DoctorService } from '../../../../core/services/doctor.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-citar-cita',
  standalone: true,
  imports: [FormsModule, CommonModule], // Asegúrate de incluir CommonModule aquí
  templateUrl: './citar-cita.component.html',
  styles: []
})
export class CitarCitaComponent implements OnInit {
  showDiagnosisModal: boolean = false; // Controla la visibilidad del modal de receta

  doctor: any;
  cita: any = {};
  citas: any[] = [];
  patient: any;
  selectedPatient: any;
  selectStatus: string = '';
  estados: any[] = [];
  selectedCita: any;
  diagnosis: string = '';
  instructions: string = '';


  constructor(
    private appointmentService: AppointmentService,
    private patientService: PatientService,
    private doctorService: DoctorService,
    private cdr: ChangeDetectorRef,
    private router: Router) {}


  ngOnInit(): void {
    this.loadDoctorData();
    this.loadAppointmentsStatus();
  }

  loadAppointmentsStatus(): void {
    this.appointmentService.getAppointmentStatus().subscribe({
      next: (data) => {
        this.estados = data;
        console.log('Estados de la cita:', data);
      },
      error: (error) => {
        console.error('Error al cargar estados de la cita:', error);
      }
    });
  }

  onStatusChange(event: any): void {
    const selectElement = event.target as HTMLSelectElement;
    this.selectStatus = selectElement.value;
    this.loadAppoByDoctorId();
  }


  loadDoctorData(): void {
    this.doctorService.getDoctorByUserId().subscribe({
      next: (data) => {
        this.doctor = data[0];
        console.log('Datos del doctor:', this.doctor);
        this.loadAppoByDoctorId();
      },
      error: (error) => {
        console.error('Error al cargar datos del doctor:', error);
      }
    });
  }

  loadAppoByDoctorId(): void{
    this.appointmentService.getCitasByDoctorId(this.doctor.id).subscribe({
      next: (data) => {
        this.citas = data;
        console.log('Datos de la cita:', this.citas);
        this.loadPatientData();
      },
      error: (error) => {
        console.error('Error al cargar datos de la cita:', error);
      }
    });
  } 

  // Cargar datos del paciente
  loadPatientData(): void {
    this.citas.forEach(cita => {
      this.patientService.getPatientById(cita.patientId).subscribe({
        next: (data) => {
          this.patient = data[0];
          console.log('Datos del paciente:', this.patient);
        },
        error: (error) => {
          console.error('Error al cargar datos del paciente:', error);
        }
      });
    });
  }



  openDiagnosisModal(cita: any): void {
    this.selectedCita = cita;
    this.diagnosis = cita.diagnosis || '';
    this.instructions = cita.instructions || '';
    this.showDiagnosisModal = true;
  }

  closeDiagnosisModal(): void {
    this.showDiagnosisModal = false;
    this.selectedCita = null;
    this.diagnosis = '';
    this.instructions = '';
  }

  saveDiagnosis(): void {
    const diagnosisRequest = {
      diagnosis: this.diagnosis,
      instructions: this.instructions
    };

    this.appointmentService.addDiagnosis(this.selectedCita.id, diagnosisRequest).subscribe({
      next: () => {
        console.log('Diagnóstico guardado para la cita:', this.selectedCita.id);
        this.selectedCita.diagnosis = this.diagnosis;
        this.selectedCita.instructions = this.instructions;
        this.closeDiagnosisModal();
        Swal.fire('Éxito', 'Diagnóstico guardado correctamente', 'success').then(() => {
          this.router.navigate(['/doctor-features/doctor-home']); // Reemplaza '/ruta-principal' con la ruta de tu ventana principal
        });
      },
      error: (error) => {
        console.error('Error al guardar diagnóstico:', error);
        Swal.fire('Error', 'Ha ocurrido un error al guardar el diagnóstico', 'error');
      }
    });
  }
}
