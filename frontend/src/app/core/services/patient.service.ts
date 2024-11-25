import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class PatientService {
  private patientUrl = 'http://localhost:8080/paciente/listar';

  constructor(private httpClient: HttpClient, private authService: AuthService) {}

  // Método para obtener todos los pacientes
  getPatients(): Observable<any> {
    return this.httpClient.get<any>(this.patientUrl);
  }

  // Método para obtener los datos del paciente utilizando el userId desde el AuthService
  getPatientByUserId(): Observable<any> {
    const userId = this.authService.getUserId();
    const url = `${this.patientUrl}/${userId}`;
    return this.httpClient.get<any>(url);
  }
}
