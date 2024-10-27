import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [],
  templateUrl: './login.component.html',
  styles: ``
})
export class LoginComponent {
  constructor(private route: ActivatedRoute, private router: Router){}
  registrosenlogin(){
    this.router.navigate(['/register']);
  }

  listacita(){
    this.router.navigate(['/listquotes']);
  }

  vistamedic(){
    this.router.navigate(['/listquotes']);
  }

}
