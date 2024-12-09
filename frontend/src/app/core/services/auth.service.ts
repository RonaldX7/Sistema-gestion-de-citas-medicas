import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { decode } from 'punycode';

interface JwtPayload {
  exp?: number;
  sub?: string;
  // Otras propiedades
}


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private LOGIN_URL = 'http://localhost:8080/auth'; // URL de la API de autenticación
  private tokenKey = 'authToken';
  private userIdKey = 'userId';

  constructor(private httpClient: HttpClient, private router: Router) {}

  // Método de login para autenticar y almacenar el token y userId
  login(username: string, password: string): Observable<any> {
    return this.httpClient.post<any>(`${this.LOGIN_URL}/log-in`, { username, password }).pipe(
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

  // Método para enviar un correo de recuperación de contraseña
  sendEmailForRecoveryPassword(email: string): Observable<any> {
    return this.httpClient.post<any>(`${this.LOGIN_URL}/recover-password/${email}`, {});
  }

  // Método para cambiar la contraseña
  changePassword(password: string, validPassword: string, code: string): Observable<any> {
    const body = { password, validPassword, code };
    return this.httpClient.post<any>(`${this.LOGIN_URL}/change-password`, body);
  }

  // Método para extraer roles del token
  getRolesFromToken(): string[] {
    const token = this.getToken();
    if (token) {
      const decodedToken: any = jwtDecode(token);
      return decodedToken.authorities ? decodedToken.authorities.split(',') : [];
    }
    return [];
  }


    // Método para redirigir según los roles
    redirectToRoleBasedView(): void {
      const roles = this.getRolesFromToken();
      if (roles.includes('ROLE_ADMIN')) {
        this.router.navigate(['/admin-home']);
      } else if (roles.includes('ROLE_USER')) {
        this.router.navigate(['/patient-features/patient-home']);
      } else if (roles.includes('ROLE_DOCTOR')) {
        this.router.navigate(['/doctor-features/doctor-home']);
      }else {
        this.router.navigate(['/login']);
      }
    }

  // Método para guardar el token en localStorage
  private setToken(token: string): void {
    sessionStorage.setItem(this.tokenKey, token);
    console.log('Token almacenado en localStorage:', sessionStorage.getItem(this.tokenKey)); // Confirmación en consola
  }

  // Método para guardar el userId en localStorage
  private setUserId(userId: string): void {
    sessionStorage.setItem(this.userIdKey, userId);
    console.log('User ID almacenado en localStorage:', sessionStorage.getItem(this.userIdKey)); // Confirmación en consola
  }

  // Método para obtener el token desde localStorage
  getToken(): string | null {
    return sessionStorage.getItem(this.tokenKey);
  }

  // Método para obtener el userId desde localStorage
  getUserId(): string | null {
    return sessionStorage.getItem(this.userIdKey);
  }

  // Método para cerrar sesión
  logout(): void {
    sessionStorage.removeItem(this.tokenKey);
    sessionStorage.removeItem(this.userIdKey);
    this.router.navigate(['/login']);
  }

  isAuthenticated(): boolean {
    const token = this.getToken();
    if(token){
      try {
        const decodedToken: JwtPayload = jwtDecode(token);
        if (decodedToken?.exp && typeof decodedToken.exp === 'number') {
        return decodedToken?.exp > Date.now() / 1000;
        }else {
          console.error('La propiedad "exp" no existe o no es un número en el token');
          return false;
        }
      } catch (error) {
        console.error('Error decodificando el token:', error);
        return false;
      }
    }
    return false;
  }
}
