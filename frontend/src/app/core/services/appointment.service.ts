import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { observableToBeFn } from 'rxjs/internal/testing/TestScheduler';

export interface Appointment  {
  id: number;
  date: string;
  patientId: number;
  doctorId:number;
  startTime: string;
  endTime: string;
  cost: any;
  statusId: 1;
}


@Injectable({
  providedIn: 'root'
})
export class AppointmentService {
  private APPOINTMENT_URL = 'http://localhost:8080/cita';
  //private citas_url='http://localhost:8080/cita/listar';
  //private citas_patient= 'const url = `${this.baseURL}/${doctor_id}`;'
  
  constructor(private httpClient: HttpClient,
    private router: Router,
  ) {}

  appointment(userData: any): Observable<any> {
    return this.httpClient.post<any>(`${this.APPOINTMENT_URL}/registrar`, userData);
  }

  getAppointmentStatus(): Observable<any> {
    return this.httpClient.get<any>(`${this.APPOINTMENT_URL}/estados`);
  }

  getCitasByPatientId(patient_id: string): Observable<any> {
    const url = `${this.APPOINTMENT_URL}/paciente/${patient_id}`;
    return this.httpClient.get<any>(url).pipe(
      tap((response) => {
        console.log('Respuesta de la API:', response); // Verifica si `statusName` está presente en la respuesta
      })
    );
  }
  getCitas(){
    return this.httpClient.get<any>(`${this.APPOINTMENT_URL}/listar`);
  }

  getCitasByDoctorId(doctor_id: string): Observable<any> {
    const url = `${this.APPOINTMENT_URL}/doctor/${doctor_id}`;
    return this.httpClient.get<any>(url).pipe(
      tap((response) => {
        console.log('Respuesta de la API:', response); // Verifica si `statusName` está presente en la respuesta
      })
    );
  }

  reprogramarCita(appointment_id:string,appointmentData:any): Observable<any>{
    return this.httpClient.put<any>(`${this.APPOINTMENT_URL}/reprogramar/${appointment_id}`,appointmentData);
  }


  addDiagnosis(appointmentId: string, diagnosisData: any): Observable<any> {
    const url = `${this.APPOINTMENT_URL}/diagnostico/${appointmentId}`;
    return this.httpClient.post<any>(url, diagnosisData);
  }

}
