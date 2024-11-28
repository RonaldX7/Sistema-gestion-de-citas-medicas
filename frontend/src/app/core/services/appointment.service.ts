import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {

  private APPOINTMENT_URL = 'http://localhost:8080/cita/registrar';
  private citas_url='http://localhost:8080/cita/listar';

  constructor(private httpClient: HttpClient,
    private router: Router,
  ) {}

  appointment(userData: any): Observable<any> {
    return this.httpClient.post<any>(this.APPOINTMENT_URL, userData);
  }

  getCitas(){
    return this.httpClient.get<any>(this.citas_url);
  }
}
