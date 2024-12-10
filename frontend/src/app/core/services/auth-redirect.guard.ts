import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthRedirectGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    if (this.authService.isAuthenticated()) {
      // Si el usuario está autenticado, redirigir al dashboard u otra ruta
      this.router.navigate(['/patient-features/patient-home']);
      return false;
    }
    return true; // Si no está autenticado, permitir la navegación
  }
}
