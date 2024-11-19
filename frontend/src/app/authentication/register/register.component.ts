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
  user = {
    name: '',
    lastName: '',
    dni: '',
    birthDate: '',
    direction: '',
    genderId: '',
    phone: '',
    email: '',
    username: '',
    password: '',
    roleId: 2 // Por ejemplo, 2 para "Paciente"
  };

  confirmPassword = '';
  showSuccessModal = false;

  constructor(private registerService: RegisterService, private router: Router) {}

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
