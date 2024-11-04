import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpecialtyService {
  private espUrl = 'http://localhost:8080/especialidades/listar'; // Cambia esta URL a tu endpoint real
  //private doctorUrl= 'http://localhost:8080/medico/listar';
  //private esp_docUrl= 'http://localhost:8080/medico/listar/${specialty_id}';// se intento pero no se pudo fallo pipipi
  constructor(private http: HttpClient) {}

  getSpecialties(): Observable<any> {
    return this.http.get<any>(this.espUrl);
  }
/*
  getDoctors(): Observable<any> {
    return this.http.get<any>(this.doctorUrl);
  }
*/
  /*getDoctorsforSpecialty(specialty_id: string): Observable<any> {
    const url = `http://localhost:8080/medico/listar/${specialty_id}`;
    return this.http.get<any>(url);
  }
    */
}
