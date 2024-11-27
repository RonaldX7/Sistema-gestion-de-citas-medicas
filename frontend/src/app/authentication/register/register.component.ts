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
    direction: '',
    genderId: '',
    phone: '',
    email: '',
    username: '',
    password: '',
    roleId: 2 // Por ejemplo, 2 para "Paciente"
  };

  showSuccessModal = false;
  showErrorModal = false;
  constructor(private registerService: RegisterService, private router: Router){}
  onRegister() {
    this.registerService.register(this.user).subscribe({
      next: (response) => {
        console.log('Registro exitoso:', response);
        // Redirige o muestra un mensaje de éxito
        //alert(' Registrado con éxito');
        this.showSuccessModal=true;
      },
      error: (err) => {
        console.error('Error en el registro:', err);
        //alert(' Hubo un error en el registro');
        this.showErrorModal=true;
      }
    });
  }
  
  closeSuccessModal(){
    this.showSuccessModal=false;
  }
  closeErrorModal(){
    this.showErrorModal=false;
  }
  backToLogin(){
    this.router.navigate(['/login']);
  }
}
