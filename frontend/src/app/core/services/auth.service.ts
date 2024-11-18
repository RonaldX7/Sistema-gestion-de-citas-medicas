import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private LOGIN_URL = 'http://localhost:8080/auth/log-in';
  private tokenKey = 'authToken';
  private userIdKey = 'userId';

  constructor(private httpClient: HttpClient, private router: Router) {}

  // Método de login para autenticar y almacenar el token y userId
  login(username: string, password: string): Observable<any> {
    return this.httpClient.post<any>(this.LOGIN_URL, { username, password }).pipe(
      tap(response => {
        if (response.jwt && response.userId) { // Asegúrate de que el token y el userId estén en la respuesta
          console.log('Token recibido:', response.jwt);
          console.log('User ID recibido:', response.userId);
          this.setToken(response.jwt); // Almacenar el token en localStorage
          this.setUserId(response.userId); // Almacenar el userId en localStorage
        } else {
          console.error('Token o User ID no encontrado en la respuesta');
        }
      })
    );
  }

  // Método para guardar el token en localStorage
  private setToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
    console.log('Token almacenado en localStorage:', localStorage.getItem(this.tokenKey)); // Confirmación en consola
  }

  // Método para guardar el userId en localStorage
  private setUserId(userId: string): void {
    localStorage.setItem(this.userIdKey, userId);
    console.log('User ID almacenado en localStorage:', localStorage.getItem(this.userIdKey)); // Confirmación en consola
  }

  // Método para obtener el token desde localStorage
  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  // Método para obtener el userId desde localStorage
  getUserId(): string | null {
    return localStorage.getItem(this.userIdKey);
  }

  // Método para cerrar sesión
  logout(): void {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.userIdKey);
    this.router.navigate(['/login']);
  }
}
