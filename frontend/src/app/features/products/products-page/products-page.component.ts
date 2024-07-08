import { CommonModule } from '@angular/common';
import { Component, HostListener, OnInit } from '@angular/core';
import { databaseWatchDetails, ProductParams } from '../../../core/models/watch-details';
import { ProductManagementService } from '../../../shared/services/productServices/product-management.service';

@Component({
  selector: 'app-products-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './products-page.component.html',
  styleUrl: './products-page.component.scss',
})
export class ProductsPageComponent implements OnInit {
  slectedGender = 'Gender';
  slectedBrand = 'Brand';
  slectedCategory = 'Category';
  selectedDropdown!: string;
  allProducts: databaseWatchDetails[] = []
  params: ProductParams = {};

  constructor(public _productManagement: ProductManagementService) {}

  // when select a gender
  selectGender(gender: string) {
    console.log(gender);
    this.slectedGender = gender
    if (gender !== "Gender") {
      // this.slectedGender = gender;
      if (gender) {
        this.params.gender = gender;
      }
    }else{
      this.params.gender = ''
    }
    this.displayProducts();

    // hide dropdown
    this.toggleGenderDropdown(this.selectedDropdown);
  }

  // when select a brand
  selectBrand(brand: string) {
    console.log(brand);
    this.slectedBrand = brand
    if (brand !== "Brand") {
      if (brand) {
        this.params.brand = brand;
      }
    }else{
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
    if (category !== "Category") {
      if (category) {
        this.params.category = category;
      }
    }else{
      this.params.category = '';
    }
    this.displayProducts();
    // hide dropdown
    this.toggleGenderDropdown(this.selectedDropdown);
  }





  displayProducts(){
    console.log(this.params);
        this._productManagement.getAllProducts(this.params).subscribe(
        (res) =>{
          this.allProducts = res
          console.log("f",this.allProducts);
        }, (error)=> {
          console.log(error);
        }
      )
  }






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

  // when click anywhere on screen
  @HostListener('document:click', ['$event'])
  onClick(event: MouseEvent) {
    const clickedElement = event.target as HTMLElement;
    if (!clickedElement.closest('.products-container__select')) {
      this.hideDropDown();
    }
  }

  ngOnInit(): void {
    this.displayProducts()
  }
  
}
