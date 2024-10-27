import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-listquotes',
  standalone: true,
  imports: [],
  templateUrl: './listquotes.component.html',
  styles: ``
})
export class ListquotesComponent {
  constructor(private route: ActivatedRoute, private router: Router){}
  regreso(){
    this.router.navigate(['/login']);
  }

  listacita(){
    this.router.navigate(['/listquotes']);
  }
}
