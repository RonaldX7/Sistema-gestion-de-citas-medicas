import { Component } from '@angular/core';
import { Router } from '@angular/router'; // Importar el Router
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-recover-password',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './recover-password.component.html',
})
export class RecoverPasswordComponent {
  email: string = '';
  verificationCode: string = '';
  errorMessage: string = '';
  verificationError: boolean = false;
  showEmailForm: boolean = true;
  showVerificationForm: boolean = false;
  successModal: boolean = false;
  constructor(private router: Router) {} // Inyectar el Router

  onSubmit() {
    if (!this.validateEmail(this.email)) {
      this.errorMessage = 'Por favor, ingrese un correo electrónico válido.';
    } else {
      this.errorMessage = '';
      this.showEmailForm = false;
      this.showVerificationForm = true;
    }
  }

  onVerifyCode() {
    if (this.verificationCode !== '123456') {
      this.verificationError = true;
      setTimeout(() => (this.verificationError = false), 500);
    } else {
      this.verificationError = false;
      this.router.navigate(['/new-password']); // Redirigir al componente de nueva contraseña
    }
  }

  validateEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
  closeModal() {
    this.verificationError = false;
    this.verificationCode = '';
    this.showVerificationForm= false; // Asegúrate de que esta propiedad controla el modal
    this.router.navigate(['/login']); // Redirige al login
  }
  closeSuccessModal() {
    this.successModal = false; // Cierra el modal de éxito
  }
}
