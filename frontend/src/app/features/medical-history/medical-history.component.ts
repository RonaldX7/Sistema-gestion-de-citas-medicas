import { Component } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-medical-history',
  standalone: true,
  imports: [],
  templateUrl: './medical-history.component.html',
  styles: ``
})
export class MedicalHistoryComponent {
  constructor(private router:Router){}

    citas(){
      this.router.navigate(['/citar-cita']);
    }

    cuenta(){
      this.router.navigate(['/account']);
    }

    doctor_home() {
      this.router.navigate(['/doctor-home']);
    }
}
