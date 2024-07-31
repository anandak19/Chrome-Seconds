import { Component, OnInit } from '@angular/core';
import { ProductManagementService } from '../../../shared/services/productServices/product-management.service';
import { databaseWatchDetails } from '../../../core/models/watch-details';
import { CommonModule, CurrencyPipe, DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-products-section',
  standalone: true,
  imports: [DecimalPipe, CommonModule],
  templateUrl: './products-section.component.html',
  styleUrl: './products-section.component.scss'
})
export class ProductsSectionComponent implements OnInit{
  featuredProducts: databaseWatchDetails[] = []

  constructor(public _productManagement: ProductManagementService) {}

  ngOnInit(): void {
    this._productManagement.getSomeProducts().subscribe(
      (res) => {
        this.featuredProducts = res
        console.log(res);
      },(error) => {
        console.error(error);
      }
    )
  }
  
}
