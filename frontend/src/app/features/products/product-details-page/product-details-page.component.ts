import { Component } from '@angular/core';
import { databaseWatchDetails } from '../../../core/models/watch-details';
import { ProductManagementService } from '../../../shared/services/productServices/product-management.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule, CurrencyPipe, DatePipe } from '@angular/common';
import { CartService } from '../../../shared/services/cartServices/cart.service';
import { AosService } from '../../../shared/services/aosService/aos.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-product-details-page',
  standalone: true,
  imports: [CommonModule, CurrencyPipe, DatePipe],
  templateUrl: './product-details-page.component.html',
  styleUrl: './product-details-page.component.scss',
})
export class ProductDetailsPageComponent {
  productId!: string;
  productData!: databaseWatchDetails;
  currentSlide: number = 0;
  deliveryDate!: Date;

  constructor(
    private route: ActivatedRoute,
    private _productService: ProductManagementService,
    private _cartService: CartService,
    private _aosService: AosService,
    private router: Router
  ) {}

  ngOnInit(): void {
    window.scrollTo(0, 0);
    const currentDate = new Date();
    this.deliveryDate = new Date(currentDate);
    this.deliveryDate.setDate(this.deliveryDate.getDate() + 5);

    const productId = this.route.snapshot.paramMap.get('productId');
    if (productId) {
      this._productService.getProductById(productId).subscribe(
        (res) => {
          this.productData = res;
          console.log(this.productData);
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }

  // to show image 
  goToSlide(index: number): void {
    this.currentSlide = index;
  }

  // update this code to check if the user is login
  // if true only perfom this code , else navigate to login 
  // to add to cart 
  addCart(productId: string): void {
    console.log(productId);
    this._cartService.addCart(productId).subscribe(
      (res) => {
        // check if the respose is true 
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
          this.router.navigateByUrl('/cart')
        }
      },
      (err) => {
        console.error(err);
      }
    );
  }

  ngAfterViewInit(): void {
    this._aosService.refresh();
  }
}
