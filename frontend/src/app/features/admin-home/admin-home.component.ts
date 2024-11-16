import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common'; // Asegúrate de importar CommonModule

@Component({
  selector: 'app-admin-home',
  standalone: true,
  imports: [RouterOutlet, CommonModule], // Agrega CommonModule aquí
  templateUrl: './admin-home.component.html'
})
export class AdminHomeComponent {}
