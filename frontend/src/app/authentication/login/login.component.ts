import { Component } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './login.component.html',
  styles: ``
})
export class LoginComponent {

  user ={
    username:'',
    password:'',
  };
  loginAttempts = 0;
  showModal = false;
  // user:string='';
  // password: string='';

  constructor(private authService:AuthService, private router:Router){
    
  }


  login(event: Event): void{
     //este es el evento para los 3 intentos
    event.preventDefault();
    this.loginAttempts++;

    if (this.loginAttempts >= 3) {
      this.showModal = true;
    } else {
      // Lógica de autenticación aquí
      // Si falla, incrementar los intentos.
    }

    console.log("Este es el usuario");
    console.log({username:this.user.username, password: this.user.password});
    if (!this.user.username || !this.user.password) {
      console.error('Username o password vacíos');
      return;
    }
    this.authService.login(this.user.username,this.user.password).subscribe({
      next: ()=> this.router.navigate(['/patient-home']),
      error: (err)=> console.error('NO te logeaste', err)
    }) 
  }

  closeModal() {
    this.showModal = false;
    this.loginAttempts = 0; // Reinicia el conteo de intentos al cerrar el modal
  }

  loginToRegister(){
    this.router.navigate(['/register'])
  }

}
