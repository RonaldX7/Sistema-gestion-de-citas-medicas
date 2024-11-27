import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RegisterService } from '../../core/services/register.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './register.component.html',
  styles: ``
})
export class RegisterComponent {
  user = {//agregar adress,districtID
    name: '',
    lastName: '',
    dni: '',
    birthDate: '',
    direction:'',
    address: '',
    districtId: 0,
    genderId: 0,
    phone: '',
    email: '',
    username: '',
    password: '',
    roleId: 2 // Por ejemplo, 2 para "Paciente"
  };

  confirmPassword = '';
  showSuccessModal = false;
  departments: any[] = [];
  districts: any[] = [];

  constructor(private registerService: RegisterService, private router: Router) {}

  ngOnInit(): void {
    this.loadDepartments();
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

  onRegister(registerForm: any) {
    if (registerForm.invalid) {
      Swal.fire({
        icon: 'warning',
        title: 'Falta rellenar campos',
        text: 'Por favor, complete todos los campos obligatorios.',
        confirmButtonText: 'Cerrar'
      });
      return;
    }

    if (this.user.password !== this.confirmPassword) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Las contraseñas no coinciden.',
        confirmButtonText: 'Cerrar'
      });
      return;
    }

    if (!this.user.email.includes('@')) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Correo electrónico inválido.',
        confirmButtonText: 'Cerrar'
      });
      return;
    }

    // Llamada al servicio para registrar al usuario
    this.registerService.register(this.user).subscribe({
      next: () => {
        Swal.fire({
          icon: 'success',
          title: 'Registro exitoso',
          text: 'Usuario registrado correctamente.',
          showConfirmButton: true,
          confirmButtonText: 'Cerrar',
          confirmButtonColor: '#3085d6'
        }).then(() => {
          this.router.navigate(['/login']);
        });
      },
      error: (err) => {
        Swal.fire({
          icon: 'error',
          title: 'Error en el registro',
          text: err.error?.message || 'Hubo un problema al registrar al usuario.',
          confirmButtonText: 'Cerrar'
        });
      }
    });
  }

  closeModal() {
    this.showSuccessModal = false;
    this.router.navigate(['/login']);
  }

  backToLogin() {
    this.router.navigate(['/login']);
  }
}
