import { Component, Output, EventEmitter, ViewChildren, ElementRef, QueryList } from '@angular/core';
import { Router } from '@angular/router'; // Importar el Router
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-recover-password',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './recover-password.component.html',
})
export class RecoverPasswordComponent {
  @Output() closeModal = new EventEmitter<void>();  // Evento para cerrar el modal

  email: string = '';  // Para almacenar el correo electrónico
  isEmailSent: boolean = false;  // Controla si ya se ha enviado el correo
  isPasswordUpdated: boolean = false;  // Controla si la contraseña fue actualizada
  code: string[] = ['', '', '', '', ''];
  newPassword: string = '';
  confirmPassword: string = '';
  constructor(
    private authService: AuthService,
    private router: Router) {} // Inyectar el Router


  
  // Usamos ViewChildren para obtener todas las referencias a los inputs
  @ViewChildren('input') inputs!: QueryList<ElementRef>;
  
  onSubmit() {
    if (this.email) {
      this.authService.sendEmailForRecoveryPassword(this.email).subscribe({
        next: () => {
          Swal.fire({
            icon: 'success',
            title: 'Correo enviado',
            text: 'Revisa tu correo electrónico para obtener el código de verificación.',
          });
          this.isEmailSent = true;
        },
        error: (err) => {
          Swal.fire({
            icon: 'error',
            title: 'Error al enviar el correo',
            text: 'No se pudo enviar el correo. Por favor, verifica tu dirección e inténtalo nuevamente.',
          });
          console.error(err);
        },
      });
    } else {
      Swal.fire({
        icon: 'warning',
        title: 'Correo requerido',
        text: 'Por favor, ingresa tu correo electrónico.',
      });
    }
  }

  onVerifyCode() {
    const fullCode = this.code.join(''); // Unir los valores de los cuadros de texto
    if (fullCode.length === 5 && this.newPassword === this.confirmPassword) {
      this.authService
        .changePassword(this.newPassword, this.confirmPassword, fullCode)
        .subscribe({
          next: () => {
            this.isPasswordUpdated = true; // Cambiar a la vista de confirmación
          },
          error: (err) => {
            Swal.fire({
              icon: 'error',
              title: 'Error al actualizar la contraseña',
              text: 'El código de verificación o la nueva contraseña son inválidos. Por favor, inténtalo de nuevo.',
            });
            console.error(err);
          },
        });
    } else {
      Swal.fire({
        icon: 'warning',
        title: 'Datos incompletos',
        text: 'Asegúrate de que el código sea correcto y las contraseñas coincidan.',
      });
    }
  }

  validateEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }


   // Cambiar el enfoque entre los cuadros de texto
   onInputChange(event: any, index: number) {
    const value = event.target.value;
  
    // Mueve el foco solo si el input actual tiene valor y no es el último
    if (value.length === 1 && index < 4) {
      const nextInput = this.inputs.toArray()[index + 1];
      if (nextInput) {
        nextInput.nativeElement.focus();
      }
    }
  }
  

  // Cerrar el modal
  onClose() {
    this.closeModal.emit(); // Emitimos el evento al hacer clic en Cancelar 
    this.router.navigate(['/login']);
  }

}
