import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  private BASE_URL = 'http://localhost:8080/paciente';
  private REGISTER_URL = 'http://localhost:8080/auth/registrar';
  private DEPARTMENTS_URL = `${this.BASE_URL}/departamentos`;
  private DISTRICTS_URL = `${this.BASE_URL}/distritos`;


  constructor(private httpClient: HttpClient, private router: Router) {}

  register(userData: any): Observable<any> {
    return this.httpClient.post<any>(this.REGISTER_URL, userData);
  }

  listDepartments(): Observable<any> {
    return this.httpClient.get<any>(this.DEPARTMENTS_URL);
  }

  listDistrictsByDepartment(departmentId: number): Observable<any> {
    return this.httpClient.get<any>(`${this.DISTRICTS_URL}/${departmentId}`);
  }

}
