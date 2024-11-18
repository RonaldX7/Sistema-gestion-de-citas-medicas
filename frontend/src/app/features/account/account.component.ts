import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-account',
  standalone: true,
  imports: [],
  templateUrl: './account.component.html',
  styles: ``
})
export class AccountComponent {
  constructor(private router:Router){}
    regreso(){
      this.router.navigate(['/login']);
    }

    agenda(){
      this.router.navigate(['/doctor-home']);
    }

    citas(){
      this.router.navigate(['/citar-cita']);
    }

    doctor_home(){
      this.router.navigate(['/doctor-home']);
    }

    history(){
      this.router.navigate(['/medical-history'])
    }
}
