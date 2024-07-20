import { Component } from '@angular/core';
import { databaseWatchDetails } from '../../../core/models/watch-details';
import { ProductManagementService } from '../../../shared/services/productServices/product-management.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-details-page',
  standalone: true,
  imports: [],
  templateUrl: './product-details-page.component.html',
  styleUrl: './product-details-page.component.scss'
})
export class ProductDetailsPageComponent {

  productId!: string;
  productData!: databaseWatchDetails

  constructor(
    private route: ActivatedRoute,
    private _productService: ProductManagementService
  ) {}


  ngOnInit(): void {
    const productId = this.route.snapshot.paramMap.get('productId');
    if (productId) {
      this._productService.getProductById(productId).subscribe(
        (res) => {
          this.productData = res
          console.log(this.productData);
        },(error)=>{
          console.log(error);
        }
      )
    }

    

  }
}
