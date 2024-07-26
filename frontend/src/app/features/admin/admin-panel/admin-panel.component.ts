import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ProductManagementService } from '../../../shared/services/productServices/product-management.service';
import { databaseWatchDetails } from '../../../core/models/watch-details';
import { CommonModule, CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-admin-panel',
  standalone: true,
  imports: [RouterLink, CurrencyPipe, CommonModule],
  templateUrl: './admin-panel.component.html',
  styleUrl: './admin-panel.component.scss',
})
export class AdminPanelComponent implements OnInit {
  public allProductsDetails: databaseWatchDetails[] = [];
  showActions: boolean = false;
  selectedProduct! : string

  constructor(
    public _router: Router,
    public _productManagement: ProductManagementService
  ) {}

  ngOnInit(): void {
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
    this.selectedProduct = productId
    this.showActions = !this.showActions;
  }


  //set as available
  changeAvailability(){

  }
  // delete a product 
  deleteProductClicked() {

    this._productManagement.deleteOneProduct(this.selectedProduct).subscribe(
      (res) => {
        console.log(res);
        this.getAllProducts()
      },
      (err) => {
        console.error(err);
      }
    )
  }
}
