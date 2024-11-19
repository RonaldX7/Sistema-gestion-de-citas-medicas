import { Component } from '@angular/core';
import { Router } from '@angular/router'; // Para redirigir si es necesario
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-new-password',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './new-password.component.html',
})
export class NewPasswordComponent {
  newPassword: string = '';
  confirmPassword: string = '';
  passwordError: string = '';
  
  verificationCode: string = '';
  verificationError: boolean = false;
  showVerificationForm: boolean = false;


  constructor(private router: Router) {}

  onSubmitPasswordChange() {
    if (!this.validatePassword(this.newPassword)) {
      this.passwordError =
        'La contraseña debe contener al menos 8 caracteres, incluyendo una mayúscula, una minúscula, un número y un carácter especial.';
    } else if (this.newPassword !== this.confirmPassword) {
      this.passwordError = 'Las contraseñas no coinciden.';
    } else {
      this.passwordError = '';
      alert('¡Contraseña cambiada con éxito!');
      this.router.navigate(['/login']); // Redirige al login después de cambiar la contraseña
    }
  }

  validatePassword(password: string): boolean {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/;
    return passwordRegex.test(password);
  }
  closeModal() {
    this.verificationError = false;
    this.verificationCode = '';
    this.showVerificationForm= false; // Asegúrate de que esta propiedad controla el modal
    this.router.navigate(['/login']); // Redirige al login
  }
}
