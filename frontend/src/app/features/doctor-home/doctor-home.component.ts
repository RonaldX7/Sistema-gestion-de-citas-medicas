import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';


@Component({
  selector: 'app-doctor-home',
  standalone: true,
  imports: [],
  templateUrl: './doctor-home.component.html',
  styles: ``
})
export class DoctorHomeComponent {
  constructor(private router:Router){}
    regreso(){
      this.router.navigate(['/login']);
    }

    citas(){
      this.router.navigate(['/citar-cita']);
    }

    cuenta(){
      this.router.navigate(['/account']);
    }
}