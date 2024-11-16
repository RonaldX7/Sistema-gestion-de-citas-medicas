import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-my-account',
  standalone: true,
  imports: [],
  templateUrl: './my-account.component.html',
  styles: ``
})
export class MyAccountComponent {
  constructor(
    private router: Router
  ){}

  logout(): void {
    //localStorage.removeItem('authToken');
    this.router.navigate(['/login']);
  }
}
