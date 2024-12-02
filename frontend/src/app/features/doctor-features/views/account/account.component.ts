import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms'; // Importa FormsModule
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';
import { DoctorService } from '../../../../core/services/doctor.service';
import { AuthService } from '../../../../core/services/auth.service';

interface Doctor {
  id: string;
  cmp: string;
  name: string;
  lastName: string;
  phone: string;
  email: string;
  newPassword: string;
  confirmPassword: string;
}

@Component({
  selector: 'app-account',
  standalone: true,
  imports: [FormsModule, CommonModule], // Agrega FormsModule aquí
  templateUrl: './account.component.html',
  styles: ``,
})

export class AccountComponent implements OnInit {
 
  // Control de visibilidad de contraseñas
  showCurrentPassword = false;
  showNewPassword = false;
  showConfirmPassword = false;

  doctorData: Doctor = {
    id: '',
    cmp: '',
    name: '',
    lastName: '',
    phone: '',
    email: '',
    newPassword: '',
    confirmPassword: ''
  };

  constructor(
    private authService: AuthService,
    private doctorService:DoctorService, 
    private router: Router) {}

  ngOnInit(): void {
    this.loadDoctorData();
    this.authService.getUserId();
  }

  loadDoctorData(): void {{
      this.doctorService.getDoctorByUserId().subscribe(
        response => {
          this.doctorData.id = response.id;
          this.doctorData.cmp = response.cmp;
          this.doctorData.name = response.name;
          this.doctorData.lastName = response.lastName;
          this.doctorData.phone = response.phone;
          this.doctorData.email = response.email;
          console.log('Datos del médico:', response);
        },
        error => {
          console.error('Error al cargar los datos del médico:', error);
        }
      );
    }
  }

  updateDoctor() {
    if (this.doctorData.newPassword !== this.doctorData.confirmPassword) {
      Swal.fire('Error', 'Las contraseñas no coinciden', 'error');
      return;
    }

    const doctorUpdateData = {
      id: this.doctorData.id,
      cmp: this.doctorData.cmp,
      name: this.doctorData.name,
      lastName: this.doctorData.lastName,
      phone: this.doctorData.phone,
      email: this.doctorData.email,
      password: this.doctorData.newPassword // Assuming you want to update the password
    };

    this.doctorService.updateDoctor(this.doctorData.id, doctorUpdateData).subscribe(
      response => {
        Swal.fire('Éxito', 'Datos actualizados correctamente', 'success');
        this.router.navigate(['/doctor-features']); // Redirigir a la página deseada
      },
      error => {
        Swal.fire('Error', 'Hubo un problema al actualizar los datos', 'error');
        console.error('Error al actualizar los datos del médico:', error);
      }
    );
  }
}
