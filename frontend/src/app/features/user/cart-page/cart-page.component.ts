import { Component, OnInit } from '@angular/core';
import { CartService } from '../../../shared/services/cartServices/cart.service';
import { CartProduct } from '../../../core/models/watch-details';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-cart-page',
  standalone: true,
  imports: [DatePipe],
  templateUrl: './cart-page.component.html',
  styleUrl: './cart-page.component.scss'
})
export class CartPageComponent implements OnInit{
  cartProducts!: CartProduct[]
  deliveryDate!: Date

  constructor (private _cartService: CartService){}

  ngOnInit(): void {
    const currentDate = new Date();
    this.deliveryDate = new Date(currentDate);
    this.deliveryDate.setDate(this.deliveryDate.getDate() + 5);
    this.getCartItems()
  }

  // here increaseQuantity and decreaseQuantity share same code, make it one later 

  increaseQuantity(productId: string): void {
    console.log(productId);
    this._cartService.addCart(productId).subscribe(
      (res) => {
        console.log(res);
        this.getCartItems()
      },
      (err) => {
        console.error(err);
      }
    );
  }

  decreaseQuantity(productId: string): void{
    console.log(productId);
    this._cartService.decreaseCart(productId).subscribe(
      (res) => {
        console.log(res);
        this.getCartItems()
      },
      (err) => {
        console.error(err);
      }
    );
  }

  removeCartItem(productId: string): void{
    this._cartService.removeCartItem(productId).subscribe(
      (res) => {
        console.log(res);
        this.getCartItems()
      }, (err) => {
        console.error(err);
      }
    )
  }

  placeOrder(){
    //order place logic
  }



    // get cart products 
    getCartItems(){
      this._cartService.getCart().subscribe(
        (res) => {
          this.cartProducts = res
        },(err) => {
          console.error(err);
        }
      )
    }
}
