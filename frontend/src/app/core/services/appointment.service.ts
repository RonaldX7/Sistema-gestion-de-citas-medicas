import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {

  private REGISTER_URL = 'http://localhost:8080/cita/registrar';

  constructor(private httpClient: HttpClient, private router: Router) {}

}
