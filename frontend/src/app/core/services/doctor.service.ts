import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DoctorService {
  private doctorUrl= 'http://localhost:8080/medico/listar';
  //private esp_docUrl= 'http://localhost:8080/medico/listar/${specialty_id}';// se intento pero no se pudo fallo pipipi
  constructor(private httpClient: HttpClient) {}

  getDoctors(): Observable<any> {
    return this.httpClient.get<any>(this.doctorUrl);
  }

  getDoctorsforSpecialty(specialty_id: string): Observable<any> {
    const url = `http://localhost:8080/medico/listar/${specialty_id}`;
    return this.httpClient.get<any>(url);
  }

  
}
