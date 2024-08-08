import { CommonModule } from '@angular/common';
import { Component, HostListener, OnInit } from '@angular/core';
import {
  databaseWatchDetails,
  ProductParams,
} from '../../../core/models/watch-details';
import { ProductManagementService } from '../../../shared/services/productServices/product-management.service';
import { Router, RouterLink } from '@angular/router';
import { CartService } from '../../../shared/services/cartServices/cart.service';
import { AosService } from '../../../shared/services/aosService/aos.service';
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
  selector: 'app-products-page',
  standalone: true,
  imports: [CommonModule, RouterLink, NgxPaginationModule],
  templateUrl: './products-page.component.html',
  styleUrl: './products-page.component.scss',
})
export class ProductsPageComponent implements OnInit {
  slectedGender = 'Gender';
  slectedBrand = 'Brand';
  slectedCategory = 'Category';
  selectedDropdown!: string;
  allProducts: databaseWatchDetails[] = [];
  params: ProductParams = {};
  // pagination 
  pageSize = 9;
  currentP = 1

  constructor(
    public _productManagement: ProductManagementService,
    private _cartService: CartService,
    private _aosService: AosService,
    private router: Router,
  ) {}

  // when select a gender
  selectGender(gender: string) {
    console.log(gender);
    this.slectedGender = gender;
    if (gender !== 'Gender') {
      // this.slectedGender = gender;
      if (gender) {
        this.params.gender = gender;
      }
    } else {
      this.params.gender = '';
    }
    this.displayProducts();

    // hide dropdown
    this.toggleGenderDropdown(this.selectedDropdown);
  }

  // when select a brand
  selectBrand(brand: string) {
    console.log(brand);
    this.slectedBrand = brand;
    if (brand !== 'Brand') {
      if (brand) {
        this.params.brand = brand;
      }
    } else {
      this.params.brand = '';
    }
    this.displayProducts();
    // hide dropdown
    this.toggleGenderDropdown(this.selectedDropdown);

  }

  // when select a category
  selectCategory(category: string) {
    console.log(category);
    this.slectedCategory = category;
    if (category !== 'Category') {
      if (category) {
        this.params.category = category;
      }
    } else {
      this.params.category = '';
    }
    this.displayProducts();
    // hide dropdown
    this.toggleGenderDropdown(this.selectedDropdown);
  }

  // method to display products
  displayProducts() {
    console.log(this.params); //
    this._productManagement.getAllProducts(this.params).subscribe(
      (res) => {
        this.allProducts = res;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  logProductwithId(id: string) {
    this._productManagement.getProductById(id).subscribe((res) => {
      console.log(res);
    });
  }

  // when add cart button clicked 
  addCart(productId: string): void {
    console.log(productId);
    this._cartService.addCart(productId).subscribe(
      (res) => {
        alert('Product Added to cart');
        this.router.navigateByUrl('/cart');
      },
      (err) => {
        console.error(err);
      }
    );
  }

  // to toggle gender dropdown 
  toggleGenderDropdown(dropdown: string) {
    if (this.selectedDropdown && this.selectedDropdown !== dropdown) {
      const currentOpenDropdown = document.querySelector(this.selectedDropdown);
      currentOpenDropdown?.classList.add('select-hide');
    }
    this.selectedDropdown = dropdown;
    const selectItems = document.querySelector(this.selectedDropdown);
    selectItems?.classList.toggle('select-hide');
  }

  // to close dropdown
  hideDropDown() {
    const selectItems = document.querySelectorAll('.select-items');
    selectItems.forEach((item) => item.classList.add('select-hide'));
  }

  onPageChange(event: number) {
    this.currentP = event;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // when click anywhere on screen
  @HostListener('document:click', ['$event'])
  onClick(event: MouseEvent) {
    const clickedElement = event.target as HTMLElement;
    if (!clickedElement.closest('.products-container__select')) {
      this.hideDropDown();
    }
  }

  ngAfterViewChecked() {
    this._aosService.refresh();
  }

  ngOnInit(): void {
    window.scrollTo(0, 0);
    this.displayProducts();

    // test usage 
    // this._productManagement.getPaginatedProducts({ page: 0, limit: 3 }).subscribe(
    //   (res) => {
    //     console.log(res);
    //   },
    //   (error) => {
    //     console.error('Error fetching paginated products:', error);
    //   }
    // );
  }

}
