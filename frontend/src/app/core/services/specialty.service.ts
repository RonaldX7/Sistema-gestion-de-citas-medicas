import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpecialtyService {
  private apiUrl = 'http://localhost:8080/especialidades/listar'; // Cambia esta URL a tu endpoint real
  private doctorUrl= 'http://localhost:8080/medico/listar';
  constructor(private http: HttpClient) {}

  getSpecialties(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  getDoctors(): Observable<any> {
    return this.http.get<any>(this.doctorUrl);
  }
}
