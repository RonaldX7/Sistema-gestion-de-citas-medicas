import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RegisterService } from '../../core/services/register.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './register.component.html',
  styles: ``
})
export class RegisterComponent {
  user = {
    name: '',
    lastName: '',
    dni: '',
    birthDate: '',
    direction: 'Pedro valle 666',
    genderId: '',
    phone: '',
    email: '',
    username: '',
    password: '',
    roleId: 2 // Por ejemplo, 2 para "Paciente"
  };
  
  constructor(private registerService: RegisterService, private router: Router){}
  onRegister() {
    this.registerService.register(this.user).subscribe({
      next: (response) => {
        console.log('Registro exitoso:', response);
        // Redirige o muestra un mensaje de éxito
      },
      error: (err) => {
        console.error('Error en el registro:', err);
      }
    });
  }

  backToLogin(){
    this.router.navigate(['/login']);
  }
}
