import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ProductManagementService } from '../../../shared/services/productServices/product-management.service';
import { databaseWatchDetails } from '../../../core/models/watch-details';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';
import Swal from 'sweetalert2';

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
  selectedProduct!: databaseWatchDetails;
  toggleProductId!: string

  pageSize = 3;
  currentP = 1;

  constructor(
    public _router: Router,
    public _productManagement: ProductManagementService
  ) {}

  ngOnInit(): void {
    window.scrollTo(0, 0);
    this.getAllProducts();
  }

  onPageChange(event: number) {
    this.currentP = event;
    window.scrollTo({ top: 0, behavior: 'smooth' });
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
    this.toggleProductId = productId
    
    this._productManagement.getProductById(productId).subscribe(
      (res) => {
        this.selectedProduct = res;
      },
      (err) => {
        console.error(err);
      }
    );
    this.showActions = !this.showActions;
  }

  //set as available
  changeAvailability() {
    const isAvailable = !this.selectedProduct.isAvailable;
    this._productManagement
      .updateAvailability(this.selectedProduct._id, isAvailable)
      .subscribe(
        (res) => {
          this.toggleActions(this.toggleProductId);
          Swal.fire({
            position: 'top',
            icon: 'success',
            title: 'Availability updated',
            showConfirmButton: false,
            timer: 1500,
          });
        },
        (err) => {
          console.error(err);
        }
      );
  }

  // delete a product
  deleteProductClicked() {
    this.toggleActions(this.toggleProductId);
    Swal.fire({
      title: 'Are you sure?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#c03f00',
      cancelButtonColor: '#c00000',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        this._productManagement
          .deleteOneProduct(this.selectedProduct._id)
          .subscribe(
            (res) => {
              console.log(res);
              this.toggleActions('');
              this.getAllProducts();
              Swal.fire({
                title: 'Deleted!',
                text: 'Product has been deleted.',
                icon: 'success',
                confirmButtonColor: '#c03f00',
              });
            },
            (err) => {
              alert(err);
            }
          );
      } else {
        this.toggleActions(this.toggleProductId);
      }
    });
  }
}
