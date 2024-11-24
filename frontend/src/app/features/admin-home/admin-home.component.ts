import { Component } from '@angular/core';
import { RouterOutlet, Router } from '@angular/router';
import { CommonModule } from '@angular/common'; // Asegúrate de importar CommonModule
import { SidebarOption } from '../sidebar/sidebar.model';
import { SidebarComponent } from '../sidebar/sidebar.component';

@Component({
  selector: 'app-admin-home',
  standalone: true,
  imports: [RouterOutlet, CommonModule, SidebarComponent], // Agrega CommonModule aquí
  templateUrl: './admin-home.component.html'
})
export class AdminHomeComponent {
  
  constructor(private router: Router) {}


  userType: string = 'admin';
  menuOptions: SidebarOption[] = [
    { name: 'Listar Citas', route: '/admin-home/list-citas' },
    { name: 'Agregar Doctor', route: '/admin-home/add-doc' },
    { name: 'Rentabilidad', route: '/admin-home/rentabilidad' },
  ];



  isActiveRoute(route: string): boolean {
    return this.router.url.startsWith(route);
  }
  logout(): void {
    localStorage.removeItem('authToken');
    this.router.navigate(['/login']);
  }

}