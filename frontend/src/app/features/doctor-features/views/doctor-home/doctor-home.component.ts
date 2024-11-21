import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../../core/services/auth.service';


@Component({
  selector: 'app-doctor-home',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './doctor-home.component.html',
  styles: ``
})
export class DoctorHomeComponent {
  constructor(private router:Router){}

    citas(){
      console.log('Navegando a /citar-cita');
      this.router.navigate(['/citar-cita']);
    }

    cuenta(){
      console.log('Navegando a /account');
      this.router.navigate(['/account']);
    }

    history(){
      console.log('Navegando a /medical-history');
      this.router.navigate(['medical-history'])
    }
}
