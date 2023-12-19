import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(private router: Router) {}

  play() {
    this.router.navigate(['/menu']);
  }
  
  galery() {
    this.router.navigate(['/photos']);
  }

}
