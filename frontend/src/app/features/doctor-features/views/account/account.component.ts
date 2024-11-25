import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms'; // Importa FormsModule
import { CommonModule } from '@angular/common'; // Importa CommonModule

@Component({
  selector: 'app-account',
  standalone: true, // Mantén esto como está
  imports: [FormsModule, CommonModule], // Agrega FormsModule y CommonModule aquí
  templateUrl: './account.component.html',
  styles: ``,
})
export class AccountComponent {
  // Contraseña simulada en el sistema
  private storedPassword = '123456'; // Contraseña inicial simulada

  // Control de visibilidad de contraseñas
  showCurrentPassword = false;
  showNewPassword = false;
  showConfirmPassword = false;

  accountData = {
    documentType: 'CMP',
    documentNumber: '45636',
    firstName: 'KATHERINE NOELINA',
    lastName: 'OBREGON CANDELA',
    phone: '987654321',
    email: 'Kath32_n@example.com',
    specialty: 'PSICOLOGÍA',
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  };

  constructor(private router: Router) {}

  // Función para alternar la visibilidad de las contraseñas
  togglePasswordVisibility(field: string) {
    if (field === 'currentPassword') {
      this.showCurrentPassword = !this.showCurrentPassword;
    } else if (field === 'newPassword') {
      this.showNewPassword = !this.showNewPassword;
    } else if (field === 'confirmPassword') {
      this.showConfirmPassword = !this.showConfirmPassword;
    }
  }

  regreso() {
    this.router.navigate(['/login']);
  }

  agenda() {
    this.router.navigate(['/doctor-home']);
  }

  citas() {
    this.router.navigate(['/citar-cita']);
  }

  doctor_home() {
    this.router.navigate(['/doctor-home']);
  }

  history() {
    this.router.navigate(['/medical-history']);
  }

  updateAccount() {
    const { currentPassword, newPassword, confirmPassword } = this.accountData;

    // Validar que todos los campos están completos
    if (!currentPassword || !newPassword || !confirmPassword) {
      alert('Por favor, complete todos los campos de contraseña.');
      return;
    }

    // Verificar que la contraseña actual coincide con la almacenada
    if (currentPassword !== this.storedPassword) {
      alert('La contraseña actual no es correcta.');
      return;
    }

    // Verificar que la nueva contraseña y la confirmación coincidan
    if (newPassword !== confirmPassword) {
      alert('La nueva contraseña y la confirmación no coinciden.');
      return;
    }

    // Verificar que la nueva contraseña cumpla con requisitos mínimos (ejemplo: longitud)
    if (newPassword.length < 6) {
      alert('La nueva contraseña debe tener al menos 6 caracteres.');
      return;
    }

    // Actualizar la contraseña almacenada
    this.storedPassword = newPassword;
    console.log('Nueva contraseña almacenada:', this.storedPassword);

    // Mensaje de éxito
    alert('¡Contraseña actualizada con éxito!');

    // Redirigir al usuario
    this.router.navigate(['/doctor-home']);
  }
}
