import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-citar-cita',
  standalone: true,
  imports: [],
  templateUrl: './citar-cita.component.html',
  styles: ``
})
export class CitarCitaComponent {
  constructor(private router:Router){}
    regreso(){
      this.router.navigate(['/login']);
    }

    agenda(){
      this.router.navigate(['/doctor-home']);
    }

    cuenta(){
      this.router.navigate(['/account'])
    }
}