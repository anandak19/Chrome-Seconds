import { Component, OnInit } from '@angular/core';
import { CartService } from '../../../shared/services/cartServices/cart.service';
import { CartProduct, orderData } from '../../../core/models/watch-details';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { WindowRefService } from '../../../shared/services/windowRefService/window-ref.service';
import { OrderService } from '../../../shared/services/orderService/order.service';
import { UserManagementService } from '../../../shared/services/userServices/user-management.service';
import { dbUserData } from '../../../core/models/user-details';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import 'animate.css';

@Component({
  selector: 'app-cart-page',
  standalone: true,
  imports: [DatePipe, CurrencyPipe],
  templateUrl: './cart-page.component.html',
  styleUrl: './cart-page.component.scss',
})
export class CartPageComponent implements OnInit {
  cartProducts!: CartProduct[];
  deliveryDate!: Date;
  totalAmount: number = 0;
  userData!: dbUserData;
  isProfileComplete: boolean = false;

  constructor(
    private _cartService: CartService,
    private _windowRef: WindowRefService,
    private _orderService: OrderService,
    private _userService: UserManagementService,
    private router: Router
  ) {}

  // get current user data 
  getUserDetails(){
    this._userService.getUserDetails().subscribe(
      (res) => {
        this.userData = res
      },(err) =>{
        console.error(err);
        alert("User not login")
      }
    )
  }
  // here increaseQuantity and decreaseQuantity share same code, make it one later

  increaseQuantity(productId: string): void {
    console.log(productId);
    this._cartService.addCart(productId).subscribe(
      (res) => {
        // console.log(res);
        this.getCartItems();
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

  // place order 
  placeOrder(amount: number) {
    this.checkProfileCompleteness()
    if (this.isProfileComplete) {
          // create a order object 
    let order : orderData[] = []
    this.cartProducts.forEach(item => {
      order.push({productId: item.productId._id, quantity: item.quantity})
    })
    //order place logic
    this._orderService.createRzPayOrder(amount, order).subscribe(
      (res) => {
        console.log('res', res);
        const orderId = res.orderId;
        const amount = res.amount;
        const dbOrderId = res.dbOrderId;

        // call pay with razor with id,amnt
        this.payWithRazor(orderId, amount, dbOrderId);
      },
      (error) => {
        console.error('Error creating order', error);
      }
    );
    } else {
      Swal.fire({
        title: "Complete your profile",
        text: "Delivery details missing.",
        showClass: {
          popup: `
            animate__animated
            animate__fadeInUp
            animate__faster
          `
        },
        hideClass: {
          popup: `
            animate__animated
            animate__fadeOutDown
            animate__faster
          `
        },
        showConfirmButton: true,
        confirmButtonColor: '#c03f00',
      });
      this.router.navigateByUrl('/user');
    }
  }

  payWithRazor(orderId: string, amount: number, dbOrderId: string) {
    const options: any = {
      key: 'rzp_test_J9Uy26wK6oSemQ',
      amount: amount,
      currency: 'INR',
      name: 'Chrome Seconds',
      description: 'Purchase of Chrome Seconds product',
      image: 'https://img.freepik.com/premium-vector/man-watch-symbol-icon-logo-design_106330-549.jpg',
      order_id: orderId,
      modal: {
        escape: false,
      },
      theme: {
        color: '#e04400',
        backdrop_color: '#000000a2' 
      },
      prefill: {
        name: this.userData.fullName,
        email: this.userData.email,
        contact: this.userData.phone 
      },
    };

    // successful 
    options.handler = (response: any, error: any) => {
      options.response = response;
      console.log(response);
      alert('Payment successful!');
      console.log(dbOrderId);
      
      this._cartService.clearCart(dbOrderId).subscribe(
        (res) => {
          this.router.navigateByUrl('/products')
        },
        (err) => {
          console.error(err);
        }
      );
      // Call API to verify signature and capture transactions
    };

    // when user close the window while transaction in process
    options.modal.ondismiss = () => {
      alert('Transaction cancelled');
    };

    const rzp = new this._windowRef.nativeWindow.Razorpay(options);
    rzp.open();
  }

  // lifecycles
  ngOnInit(): void {
    window.scrollTo(0, 0);
    const currentDate = new Date();
    this.deliveryDate = new Date(currentDate);
    this.deliveryDate.setDate(this.deliveryDate.getDate() + 5);
    this.getCartItems();
    // get current user data 
    this.getUserDetails()

  }

  // get cart products
  getCartItems() {
    this._cartService.getCart().subscribe(
      (res) => {
        this.cartProducts = res;
        console.log(this.cartProducts);
        this.calcTotalAmount();
      },
      (err) => {
        console.error(err);
      }
    );
  }

  checkProfileCompleteness(){
    const { address, phone, pincode } = this.userData;
    if (address && phone && pincode) {
      this.isProfileComplete = true
    } else {
      this.isProfileComplete = false
    }
  }
}
