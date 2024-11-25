import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // Asegúrate de importar CommonModule
import { RouterOutlet,Router } from '@angular/router';
import { SidebarComponent } from "../sidebar/sidebar.component";
import { SidebarOption } from '../sidebar/sidebar.model';

@Component({
  selector: 'app-doctor-features',
  standalone: true,
  imports: [RouterOutlet, CommonModule, SidebarComponent],
  templateUrl: './doctor-features.component.html',
})
export class DoctorFeaturesComponent {
  constructor(private router: Router) {}

  userType: string = 'doctor';
  menuOptions: SidebarOption[] = [
    { name: 'Inicio', route: '/doctor-features/doctor-home' },
    { name: 'Mi Cuenta', route: '/doctor-features/account' },
    { name: 'Citas', route: '/doctor-features/citar-cita' },
    { name: 'Historial Clinico', route: '/doctor-features/medical-history' },
  ];

  isActiveRoute(route: string): boolean {
    return this.router.url.startsWith(route);
  }
  logout(): void {
    localStorage.removeItem('authToken');
    this.router.navigate(['/login']);
  }
}
