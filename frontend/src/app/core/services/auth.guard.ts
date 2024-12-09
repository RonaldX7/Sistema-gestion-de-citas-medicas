import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    // Verificar si el token existe en localStorage
    const token = sessionStorage.getItem('authToken');

    if (token) {
      // Si el token existe, dejar pasar la navegación
      return true;
    } else {
      // Si no hay token, redirigir al login
      this.router.navigate(['/login']);
      return false;
    }
  }

  
}
