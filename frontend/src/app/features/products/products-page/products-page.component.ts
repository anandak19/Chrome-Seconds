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
import Swal from 'sweetalert2';
import { UserManagementService } from '../../../shared/services/userServices/user-management.service';

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
  isLogin :boolean = false
  // pagination
  pageSize = 9;
  currentP = 1;

  constructor(
    public _productManagement: ProductManagementService,
    private _userService: UserManagementService,
    private _cartService: CartService,
    private _aosService: AosService,
    private router: Router
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

    // update this code to check if the user is login
  // if true only perfom this code , else navigate to login 
  // when add cart button clicked
  addCart(productId: string): void {
    if (this.isLogin) {
      this._cartService.addCart(productId).subscribe(
        (res) => {
          // check if respose coming or true 
          if (res) {
            Swal.fire({
              toast: true,
              position: 'top',
              icon: 'success',
              title: 'Product added to cart!',
              showConfirmButton: false,
              timer: 2500,
              timerProgressBar: false,
            });
            this.router.navigateByUrl('/cart');
          }
        },
        (err) => {
          console.error(err);
        }
      );
    } else {
      this.router.navigate(['/login']);
    }
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

  checkIfUserLogin(){
    this._userService.isLoggedIn.subscribe((loggedIn: boolean) => {
      this.isLogin = loggedIn;
    });
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
    this.checkIfUserLogin()
  }
}
