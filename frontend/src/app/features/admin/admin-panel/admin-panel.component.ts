import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ProductManagementService } from '../../../shared/services/productServices/product-management.service';
import { databaseWatchDetails } from '../../../core/models/watch-details';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
  selector: 'app-admin-panel',
  standalone: true,
  imports: [RouterLink, CurrencyPipe, CommonModule, NgxPaginationModule],
  templateUrl: './admin-panel.component.html',
  styleUrl: './admin-panel.component.scss',
})
export class AdminPanelComponent implements OnInit {
  public allProductsDetails: databaseWatchDetails[] = [];
  showActions: boolean = false;
  selectedProduct! : databaseWatchDetails

  pageSize = 3;
  currentP = 1

  constructor(
    public _router: Router,
    public _productManagement: ProductManagementService
  ) {}

  ngOnInit(): void {
    window.scrollTo(0, 0);
    this.getAllProducts()
  }

  getAllProducts() {
    // get products
    this._productManagement.getAllProducts().subscribe(
      (res: databaseWatchDetails[]) => {
        this.allProductsDetails = res;
        console.log(this.allProductsDetails);
      },
      (err) => {
        console.error(err);
      }
    );
  }

  toggleActions(productId: string): void {
    this._productManagement.getProductById(productId).subscribe(
      (res) => {
        this.selectedProduct = res
      },(err) => {
        console.error(err);
        
      }
    )
    this.showActions = !this.showActions;
  }


  //set as available
  changeAvailability(){
    const isAvailable = !this.selectedProduct.isAvailable
    console.log(this.selectedProduct._id);
    
    this._productManagement.updateAvailability(this.selectedProduct._id, isAvailable).subscribe(
      (res)=> {
        console.log(res);
        alert("Availability updated")
        this.toggleActions('')
      },(err) => {
        console.error(err);
      }
    )
  }

  // delete a product 
  deleteProductClicked() {
    this._productManagement.deleteOneProduct(this.selectedProduct._id).subscribe(
      (res) => {
        console.log(res);
        alert("Availability updated")
        this.toggleActions('')
        this.getAllProducts()
      },
      (err) => {
        console.error(err);
      }
    )
  }
}
