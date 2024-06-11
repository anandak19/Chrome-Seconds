import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ProductManagementService } from '../../../shared/services/productServices/product-management.service';
import { databaseWatchDetails } from '../../../core/models/watch-details';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-admin-panel',
  standalone: true,
  imports: [RouterLink, CurrencyPipe],
  templateUrl: './admin-panel.component.html',
  styleUrl: './admin-panel.component.scss',
})
export class AdminPanelComponent implements OnInit {
  public allProductsDetails: databaseWatchDetails[] = [];

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

  deleteProductClicked(productId: string) {
    this._productManagement.deleteOneProduct(productId).subscribe(
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
