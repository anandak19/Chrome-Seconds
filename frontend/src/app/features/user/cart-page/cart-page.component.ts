import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { CartService } from '../../../shared/services/cartServices/cart.service';
import { CartProduct } from '../../../core/models/watch-details';
import { CurrencyPipe, DatePipe } from '@angular/common';

@Component({
  selector: 'app-cart-page',
  standalone: true,
  imports: [DatePipe, CurrencyPipe],
  templateUrl: './cart-page.component.html',
  styleUrl: './cart-page.component.scss',
})
export class CartPageComponent implements OnInit, OnChanges {
  cartProducts!: CartProduct[];
  deliveryDate!: Date;
  totalAmount: number = 0;

  constructor(private _cartService: CartService) {}

  ngOnInit(): void {
    const currentDate = new Date();
    this.deliveryDate = new Date(currentDate);
    this.deliveryDate.setDate(this.deliveryDate.getDate() + 5);
    this.getCartItems();
    // this.calcTotalAmount();
  }

  // here increaseQuantity and decreaseQuantity share same code, make it one later

  increaseQuantity(productId: string): void {
    console.log(productId);
    this._cartService.addCart(productId).subscribe(
      (res) => {
        // console.log(res);
        this.getCartItems()
      },
      (err) => {
        console.error(err);
      }
    );
  }

  decreaseQuantity(productId: string): void {
    console.log(productId);
    this._cartService.decreaseCart(productId).subscribe(
      (res) => {
        // console.log(res);
        this.getCartItems();
      },
      (err) => {
        console.error(err);
      }
    );
  }

  removeCartItem(productId: string): void {
    this._cartService.removeCartItem(productId).subscribe(
      (res) => {
        // console.log(res);
        this.getCartItems();
      },
      (err) => {
        console.error(err);
      }
    );
  }

  calcTotalAmount(): void {
    this.totalAmount = 0; // Reset total amount before calculation
    for (const product of this.cartProducts) {
      this.totalAmount += product.productId.price * product.quantity;
    }
  }
  

  placeOrder() {
    //order place logic
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('Changes detected:');
  }
  

  // get cart products
  getCartItems() {
    this._cartService.getCart().subscribe(
      (res) => {
        this.cartProducts = res;
        console.log("Get");
        this.calcTotalAmount();
        
      },
      (err) => {
        console.error(err);
      }
    );
  }
}
