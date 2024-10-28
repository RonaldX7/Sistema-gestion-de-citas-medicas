import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [],
  templateUrl: './register.component.html',
  styles: ``
})
export class RegisterComponent {

  constructor(private route: ActivatedRoute, private router: Router){}
  backToLogin(){
    this.router.navigate(['/login']);
  }
}
