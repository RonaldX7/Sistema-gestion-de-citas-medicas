import { Component } from '@angular/core';
import { RouterOutlet, Router } from '@angular/router';
import { CommonModule } from '@angular/common'; // Asegúrate de importar CommonModule

@Component({
  selector: 'app-admin-home',
  standalone: true,
  imports: [RouterOutlet, CommonModule], // Agrega CommonModule aquí
  templateUrl: './admin-home.component.html'
})
export class AdminHomeComponent {
constructor(private router: Router) {}

  isActiveRoute(route: string): boolean {
    return this.router.url.startsWith(route);
  }
}