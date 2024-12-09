import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms'; // Importa FormsModule
import { CommonModule } from '@angular/common'; // Importar CommonModule
import { RegisterService } from '../../../../core/services/register.service';
import { AuthService } from '../../../../core/services/auth.service';
import { PatientService } from '../../../../core/services/patient.service';
import Swal from 'sweetalert2';

interface Patient {
  id: string;
  dni: string;
  name: string;
  lastName: string;
  address: string;
  districtId: number;
  phone: string;
  email: string;
  newPassword: string;
  confirmPassword: string;
}

@Component({
  selector: 'app-my-account',
  standalone: true,
  imports: [FormsModule, CommonModule], // Incluir CommonModule aquí
  templateUrl: './my-account.component.html',
  styles: ``,
})
export class MyAccountComponent implements OnInit {

  departments: any[] = [];
  districts: any[] = [];


  patientData: Patient = {
    id: '',
    dni: '',
    name: '',
    lastName: '',
    address: '',
    districtId: 0,
    phone: '',
    email: '',
    newPassword: '',
    confirmPassword: ''
  };

  constructor(
    private authService: AuthService,
    private patientService: PatientService,
    private registerService: RegisterService,
    private router: Router) {}

  ngOnInit(): void {
    this.loadDepartments();
    this.loadPatientData();
  }

  loadDepartments(): void {
    this.registerService.listDepartments().subscribe(
      response => {
        this.departments = response;
      },
      error => {
        console.error('Error al cargar los departamentos:', error);
      }
    );
  }

  onDepartmentChange(event: Event): void {
    // Convertir el valor del evento a un número
    const departmentId = Number((event.target as HTMLSelectElement).value);
    this.registerService.listDistrictsByDepartment(departmentId).subscribe(
      response => {
        this.districts = response;
      },
      error => {
        console.error('Error al cargar los distritos:', error);
      }
    );
  }

  loadPatientData(): void {
    this.patientService.getPatientByUserId().subscribe(
      response => {
        if (response.length > 0) {
          const patient = response[0];
          this.patientData = {
            id: patient.id,
            dni: patient.dni,
            name: patient.name,
            lastName: patient.lastName,
            address: patient.address,
            districtId: patient.districtId,
            phone: patient.phone,
            email: patient.email,
            newPassword: '',
            confirmPassword: ''
          };
        } else {
          console.warn('No se encontró ningún paciente con este userId.');
        }
      },
      (error) => {
        console.error('Error al cargar los datos del paciente:', error);
      }
    );
  }

  updatePatient(): void {
    if (this.patientData.newPassword !== this.patientData.confirmPassword) {
      Swal.fire('Error', 'Las contraseñas no coinciden', 'error');
      return;
    }

    const patientUpdateData = {
      id: this.patientData.id,
      name: this.patientData.name,
      lastName: this.patientData.lastName,
      address: this.patientData.address,
      districtId: this.patientData.districtId,
      phone: this.patientData.phone,
      email: this.patientData.email,
      password: this.patientData.newPassword
    };

    this.patientService.updatePatient(this.patientData.id, patientUpdateData).subscribe(
      response => {
        Swal.fire('Datos actualizados', 'Los datos se han actualizado correctamente', 'success');
        this.router.navigate(['/patient-features/patient-home']);
      },
      error => {
        // Manejar errores y mostrar mensajes claros al usuario
        if (error.status === 400) {
          Swal.fire('Error', 'Verifica los datos ingresados', 'error');
        } else if (error.status === 409) {
          Swal.fire('Error', 'El correo electrónico ya está en uso', 'error');
        } else {
          Swal.fire('Error', 'Hubo un problema al actualizar los datos', 'error');
        }
        console.error('Error al actualizar los datos del paciente:', error);
      }
    );
  }
}