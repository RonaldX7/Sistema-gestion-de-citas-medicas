import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from "../sidebar/sidebar.component";
import { SidebarOption } from '../sidebar/sidebar.model';

@Component({
  selector: 'app-patient-features',
  standalone: true,
  imports: [RouterOutlet,CommonModule,SidebarComponent],
  templateUrl: './patient-features.component.html',
})
export class PatientFeaturesComponent {

  constructor(private router: Router) {}
  
  userType: string = 'patient';
  menuOptions: SidebarOption[] = [
    { name: 'Inicio', route: '/patient-features/patient-home' },
    { name: 'Realizar Cita Medica', route: '/patient-features/appointments' },
    { name: 'Mis citas', route: '/patient-features/appointments-list' },
  ];

  isActiveRoute(route: string): boolean {
    return this.router.url.startsWith(route);
  }
  logout(): void {
    localStorage.removeItem('authToken');
    this.router.navigate(['/login']);
  }

}
