import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  private REGISTER_URL = 'http://localhost:8080/auth/registrar';

  constructor(private httpClient: HttpClient, private router: Router) {}

  register(userData: any): Observable<any> {
    return this.httpClient.post<any>(this.REGISTER_URL, userData);
  }

}
