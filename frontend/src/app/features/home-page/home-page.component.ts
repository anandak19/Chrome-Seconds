import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { HeroSectionComponent } from './hero-section/hero-section.component';
import { ProductsSectionComponent } from './products-section/products-section.component';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [RouterLink, HeroSectionComponent, ProductsSectionComponent],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss'
})
export class HomePageComponent {

  constructor(public _router: Router) {}

  // navigate to admin page 
  navigateAdmin(){
    this._router.navigateByUrl("admin");
  }

}
