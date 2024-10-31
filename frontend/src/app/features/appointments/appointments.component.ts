import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-appointments',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './appointments.component.html',
  styles: [`
    .blur {
      filter: blur(5px);
    }
  `]
})
export class AppointmentsComponent {
  private tokenKey = 'authToken';
  showModal = true;
  doctors = [
    { name: 'Carbajal Vasquez, Juliana Del Carmen', schedule: ['12:30', '12:50', '13:10', '13:40', '14:00'] },
    { name: 'Obregon Candela, Katherine Noelia', schedule: ['15:00', '15:30'] },
    { name: 'Arostegui Aragon, Fredy', schedule: [] } // Sin horario disponible
  ];

  constructor(private authService:AuthService, private router:Router){}
  
  private getToken(): string | null{
    return localStorage.getItem(this.tokenKey);
  }
  logout():void{
    localStorage.removeItem(this.tokenKey);
    this.router.navigate(['/login']);
  }

  closeModal(): void {
    this.showModal = false;
  }
}
