import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SpecialtyService } from '../../core/services/specialty.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-appointments',
  templateUrl: './appointments.component.html',
  standalone: true,
  imports: [CommonModule]
})
export class AppointmentsComponent implements OnInit {
  showModal = false;
  doctors: { name: string; schedule: string[] }[] = []; // Cambiamos para obtener desde la base de datos
  specialties: any[] = []; // Arreglo para almacenar las especialidades

  constructor(
    private router: Router,
    private specialtyService: SpecialtyService
  ) {}

  ngOnInit(): void {
    this.loadSpecialties();
    this.loadDoctors(); // Cargar doctores desde el backend
  }

  loadSpecialties(): void {
    this.specialtyService.getSpecialties().subscribe(
      (data) => {
        this.specialties = data;
      },
      (error) => {
        console.error('Error al cargar especialidades', error);
      }
    );
  }

  loadDoctors(): void {
    this.specialtyService.getDoctors().subscribe(
      (data) => {
        this.doctors = data;
      },
      (error) => {
        console.error('Error al cargar doctores', error);
      }
    );
  }

  logout(): void {
    localStorage.removeItem('authToken');
    this.router.navigate(['/login']);
  }

  closeModal(): void {
    this.showModal = false;
  }
}
