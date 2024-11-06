import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {

  private REGISTER_APPOINTMENT_URL = 'http://localhost:8080/cita/registrar';

  constructor(private httpClient: HttpClient, private router: Router) {}

  appointment(userData: any): Observable<any> {
    return this.httpClient.post<any>(this.REGISTER_APPOINTMENT_URL, userData);
  }



}
