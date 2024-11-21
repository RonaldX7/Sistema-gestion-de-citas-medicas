import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // Asegúrate de importar CommonModule
import { RouterOutlet,Router } from '@angular/router';
import { SidebarComponent } from "../sidebar/sidebar.component";

@Component({
  selector: 'app-doctor-features',
  standalone: true,
  imports: [RouterOutlet, CommonModule, SidebarComponent],
  templateUrl: './doctor-features.component.html',
  styles: ``
})
export class DoctorFeaturesComponent {
  constructor(private router: Router) {}
  isActiveRoute(route: string): boolean {
    return this.router.url.startsWith(route);
  }
  logout(): void {
    localStorage.removeItem('authToken');
    this.router.navigate(['/login']);
  }
}
