import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { HeroSectionComponent } from './hero-section/hero-section.component';
import { ProductsSectionComponent } from './products-section/products-section.component';
import * as AOS from 'aos';
import { AosService } from '../../shared/services/aosService/aos.service';
import { PromisesSectionComponent } from './promises-section/promises-section.component';
import { BrandsSectionComponent } from './brands-section/brands-section.component';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [
    RouterLink,
    HeroSectionComponent,
    ProductsSectionComponent,
    PromisesSectionComponent,
    BrandsSectionComponent,
  ],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss',
})
export class HomePageComponent implements OnInit {
  constructor(public _router: Router, private _aosService: AosService) {}
  ngOnInit(): void {
    window.scrollTo(0, 0);
  }

  // navigate to admin page
  navigateAdmin() {
    this._router.navigateByUrl('admin');
  }

  ngAfterViewInit(): void {
    this._aosService.refresh();
  }
}
