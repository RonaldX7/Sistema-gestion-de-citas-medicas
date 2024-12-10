import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Doctor } from '../../Models/doctor.model';
import { AuthService } from './auth.service';
@Injectable({
  providedIn: 'root'
})
export class DoctorService {
 
  //private doctor_register_url='http://localhost:8080/medico/registrar'
  private doctorUrl= 'http://localhost:8080/medico';
  
  //private esp_docUrl= 'http://localhost:8080/medico/listar/${specialty_id}';// se intento pero no se pudo fallo pipipi
  constructor(
    private httpClient: HttpClient,
    private authService: AuthService
  ) {}

 
  getDoctors(): Observable<any> {
    return this.httpClient.get<Doctor[]>(`${this.doctorUrl}/listar`);
  }

  getDoctorsforSpecialty(specialty_id: string): Observable<any> {
    const url = `${this.doctorUrl}/listar/${specialty_id}`;
    return this.httpClient.get<any>(url);
  }

  registerDoctor(doctorData:any): Observable<any>{
    return this.httpClient.post<any>(`${this.doctorUrl}/registrar`,doctorData);
  }

  getDoctorByUserId(): Observable<any> {
    const userId = this.authService.getUserId();
    const url = `${this.doctorUrl}/${userId}`;
    return this.httpClient.get<any>(url);
  }

  updateDoctor(id:string, doctorData:any): Observable<any>{
    return this.httpClient.put<any>(`${this.doctorUrl}/actualizar/${id}`,doctorData);
  }

  deleteDoctor(id:string): Observable<any>{
    return this.httpClient.delete<any>(`${this.doctorUrl}/eliminar/${id}`);
  }
  
}
