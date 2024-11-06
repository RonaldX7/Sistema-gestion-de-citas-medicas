import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpecialtyService {
  private espUrl = 'http://localhost:8080/especialidades/listar'; // Cambia esta URL a tu endpoint real
  constructor(private http: HttpClient) {}

  getSpecialties(): Observable<any> {
    return this.http.get<any>(this.espUrl);
  }
}
