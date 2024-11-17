import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-order',
  standalone: true,
  imports: [],
  templateUrl: './order.component.html',
  styles: ``
})
export class OrderComponent {
  constructor(
    private router: Router
  ){}

  logout(): void {
    //localStorage.removeItem('authToken');
    this.router.navigate(['/login']);
  }
}
