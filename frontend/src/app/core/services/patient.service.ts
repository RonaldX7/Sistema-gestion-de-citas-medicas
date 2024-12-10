import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class PatientService {
  private patientUrl = 'http://localhost:8080/paciente';

  constructor(
    private httpClient: HttpClient, 
    private authService: AuthService
  ) {}

  // Método para obtener todos los pacientes
  getPatients(): Observable<any> {
    return this.httpClient.get<any>(`${this.patientUrl}/listar`);
  }

  // Método para obtener los datos del paciente utilizando el userId desde el AuthService
  getPatientByUserId(): Observable<any> {
    const userId = this.authService.getUserId();
    const url = `${this.patientUrl}/listar/${userId}`;
    return this.httpClient.get<any>(url);
  }

  // Método para obtener los datos del paciente utilizando el ID
  getPatientById(id: string): Observable<any> {
    return this.httpClient.get<any>(`${this.patientUrl}/${id}`);
  }


  // Método para obtener los datos del paciente utilizando el DNI
  getPatientByDni(dni: string): Observable<any> {
    return this.httpClient.get<any>(`${this.patientUrl}/buscar/${dni}`);
  }

  updatePatient(id: string, patientData: any): Observable<any> {
    return this.httpClient.put<any>(`${this.patientUrl}/actualizar/${id}`, patientData);
  }
}
