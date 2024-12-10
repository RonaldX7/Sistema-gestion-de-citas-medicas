import { Component, Input } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { SidebarOption } from './sidebar.model';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterModule, NgFor],
  templateUrl: './sidebar.component.html',
  styles: ``
})


export class SidebarComponent  {
  @Input() options: SidebarOption[] = []; // Opciones del menú dinámico
  @Input() userType!: string; // Tipo de usuario: admin, doctor, paciente
  
  constructor(private router:Router){}
  logout(): void {
    // Lógica de cierre de sesión
    sessionStorage.removeItem('authToken');
    this.router.navigate(['/login']);
  }
}
