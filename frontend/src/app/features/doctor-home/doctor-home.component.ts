import { Component } from '@angular/core';
<<<<<<< HEAD
=======
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

>>>>>>> origin/josue

@Component({
  selector: 'app-doctor-home',
  standalone: true,
  imports: [],
  templateUrl: './doctor-home.component.html',
  styles: ``
})
export class DoctorHomeComponent {
<<<<<<< HEAD

=======
  constructor(private router:Router){}

    citas(){
      this.router.navigate(['/citar-cita']);
    }

    cuenta(){
      this.router.navigate(['/account']);
    }

    history(){
      this.router.navigate(['/medical-history'])
    }
>>>>>>> origin/josue
}
