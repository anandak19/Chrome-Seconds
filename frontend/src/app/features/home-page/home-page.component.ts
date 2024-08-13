import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { HeroSectionComponent } from './hero-section/hero-section.component';
import { ProductsSectionComponent } from './products-section/products-section.component';
import { AosService } from '../../shared/services/aosService/aos.service';
import { PromisesSectionComponent } from './promises-section/promises-section.component';
import { BrandsSectionComponent } from './brands-section/brands-section.component';
import { DataService } from '../../shared/services/passingDataService/data.service';
import { UserManagementService } from '../../shared/services/userServices/user-management.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [
    RouterLink,
    HeroSectionComponent,
    ProductsSectionComponent,
    PromisesSectionComponent,
    BrandsSectionComponent,
    CommonModule,
  ],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss',
})
export class HomePageComponent implements OnInit {
  isAdmin: boolean = false;

  constructor(
    public _router: Router,
    private _aosService: AosService,
    private _userService: UserManagementService,
    private dataService: DataService,
    private router: Router
  ) {}
  ngOnInit(): void {
    window.scrollTo(0, 0);
    const authData = this._userService.getAuthData();
    if (authData && authData.role) {
      if (authData.role === 'admin') {
        this.isAdmin = true;
      }
    }
  }

  // navigate to admin page
  navigateAdmin() {
    this._router.navigateByUrl('admin');
  }

  ngAfterViewInit(): void {
    this._aosService.refresh();
  }

  sendGender(gender: string) {
    this.dataService.changeData(gender);
    this.router.navigateByUrl('/products');
  }
}
