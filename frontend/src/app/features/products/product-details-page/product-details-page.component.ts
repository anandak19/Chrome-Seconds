import { Component } from '@angular/core';
import { databaseWatchDetails } from '../../../core/models/watch-details';
import { ProductManagementService } from '../../../shared/services/productServices/product-management.service';
import { ActivatedRoute } from '@angular/router';
import { CommonModule, CurrencyPipe, DatePipe } from '@angular/common';

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
    private _productService: ProductManagementService
  ) {}

  ngOnInit(): void {
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

  goToSlide(index: number): void {
    this.currentSlide = index;
  }
}
