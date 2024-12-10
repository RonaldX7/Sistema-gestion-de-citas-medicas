import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-rentabilidad',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './rentabilidad.component.html',
})
export class RentabilidadComponent {
  // Fechas
  fechaInicio: string = '';
  fechaFin: string = '';

  // Ingresos
  tipoIngreso: string = '';
  montoIngreso: number = 0;
  ingresos: { tipo: string; monto: number }[] = [];
  opcionesIngreso = [
    'Consulta médica',
    'Procedimientos quirúrgicos',
    'Laboratorios',
    'Farmacia',
    'Otros'
  ];

  // Costos
  tipoCosto: string = '';
  montoCosto: number = 0;
  costos: { tipo: string; monto: number }[] = [];
  opcionesCosto = [
    'Salarios y Honorarios',
    'Insumos Médicos',
    'Mantenimiento de Equipos',
    'Publicidad y Marketing',
    'Otros'
  ];

  // Totales
  totalIngresos: number = 0;
  totalCostos: number = 0;
  rentabilidad: number = 0;
  mostrarResultados: boolean = false;

  agregarIngreso() {
    if (this.tipoIngreso && this.montoIngreso > 0) {
      this.ingresos.push({ tipo: this.tipoIngreso, monto: this.montoIngreso });
      this.montoIngreso = 0;
    }
  }

  eliminarIngreso(index: number) {
    this.ingresos.splice(index, 1);
  }

  agregarCosto() {
    if (this.tipoCosto && this.montoCosto > 0) {
      this.costos.push({ tipo: this.tipoCosto, monto: this.montoCosto });
      this.montoCosto = 0;
    }
  }

  eliminarCosto(index: number) {
    this.costos.splice(index, 1);
  }

  calcularRentabilidad() {
    this.totalIngresos = this.ingresos.reduce((sum, ingreso) => sum + ingreso.monto, 0);
    this.totalCostos = this.costos.reduce((sum, costo) => sum + costo.monto, 0);
    this.rentabilidad = this.totalIngresos - this.totalCostos;
    this.mostrarResultados = true;
  }

  resetResultados() {
    this.mostrarResultados = false;
  }
}
