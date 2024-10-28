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
  user:string='';
  password: string='';

  constructor(private authService:AuthService, private router:Router){
    
  }

  login(): void{
    this.authService.login(this.user,this.password).subscribe({
      next: ()=> this.router.navigate(['/patient-home']),
      error: (err)=> console.error('NO te logeaste', err)
    }) 
  }

}
