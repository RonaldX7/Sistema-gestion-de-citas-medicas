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
  constructor(private router:Router){}
    logout(){
      this.router.navigate(['/login']);
    }

    MisCitas(){
      this.router.navigate(['/doctor-home']);
    }

    order(){
      this.router.navigate(['/citar-cita']);
    }
}