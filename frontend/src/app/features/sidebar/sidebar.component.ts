import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [],
  templateUrl: './sidebar.component.html',
  styles: ``
})
export class SidebarComponent {
  constructor(private router:Router){}
  logout(): void {
    // Lógica de cierre de sesión
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}
