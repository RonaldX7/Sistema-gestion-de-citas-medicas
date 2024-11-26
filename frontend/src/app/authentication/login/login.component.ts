import { Component } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styles: ``
})
export class LoginComponent {
  user = {
    username: '',
    password: '',
  };
  loginAttempts = 0;
  showModal = false;
  loginError = false; // Variable para mostrar el mensaje de error

  constructor(private authService: AuthService, private router: Router) {}

  login(event: Event): void {
    event.preventDefault();

    this.loginAttempts++;
    this.loginError = false; // Restablecer el error cada vez que intenta iniciar sesión

    if (this.loginAttempts >= 3) {
      this.showModal = true;
    } else {
      if (!this.user.username || !this.user.password) {
        console.error('Username o password vacíos');
        return;
      }

      this.authService.login(this.user.username, this.user.password).subscribe({
        next: () => {
          this.router.navigate(['/patient-features/patient-home']);
        },
        error: (err) => {
          console.error('Error en autenticación:', err);
          this.loginError = true; // Mostrar mensaje de error en caso de fallo
        }
      });
    }
  }

  closeModal() {
    this.showModal = false;
    this.loginAttempts = 0; // Reinicia el conteo de intentos al cerrar el modal
  }

  loginToRegister() {
    this.router.navigate(['/register']);
  }
}
