import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { CartService } from '../../../shared/services/cartServices/cart.service';
import { CartProduct } from '../../../core/models/watch-details';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { WindowRefService } from '../../../shared/services/windowRefService/window-ref.service';
import { OrderService } from '../../../shared/services/orderService/order.service';

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

  constructor(private _cartService: CartService, private _windowRef: WindowRefService, private _orderService: OrderService) {}



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
  

  placeOrder(amount: number) {
    console.log("To pay",amount);
    
    //order place logic
    this._orderService.createRzPayOrder(amount).subscribe(
      (res) => {
        console.log('res', res);
        const orderId = res.orderId;
        const amount = res.amount

        // call pay with razor with id,amnt
        this.payWithRazor(orderId, amount)
        
      },(error) => {
        console.error('Error creating order', error);
        
      }
    )
  }

  payWithRazor(orderId : string, amount: number){
    const options: any = {
      key : 'rzp_test_J9Uy26wK6oSemQ',
      amount: amount,
      currency: 'INR',
      name: 'Chrome Seconds',
      description: '',
      image: '' ,
      order_id: orderId,
      modal: {
        escape: false
      },
      theme: {
        color: '#e04400'
      }
    }

    options.handler = (response: any, error: any) => {
      options.response = response;
      console.log(response);
      console.log(options);
      //call api to varify signature and capture transactions
    }

    options.modal.ondismiss = () => {
      // when user close the window while transaction in process 
      console.log("Transaction cancelled");
    }

    const rzp = new this._windowRef.nativeWindow.Razorpay(options)
    rzp.open();
  }




  
  // lifecycles 
  ngOnInit(): void {
    window.scrollTo(0, 0);
    const currentDate = new Date();
    this.deliveryDate = new Date(currentDate);
    this.deliveryDate.setDate(this.deliveryDate.getDate() + 5);
    this.getCartItems();
    // this.calcTotalAmount();
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('Changes detected:');
  }
  
  // get cart products
  getCartItems() {
    this._cartService.getCart().subscribe(
      (res) => {
        this.cartProducts = res;
        // console.log("Get");
        this.calcTotalAmount();
        
      },
      (err) => {
        console.error(err);
      }
    );
  }
}
