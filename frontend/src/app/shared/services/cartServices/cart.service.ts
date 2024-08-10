import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, switchMap } from 'rxjs';
import { UserManagementService } from '../userServices/user-management.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private apiUrl = 'users';

  constructor(
    private _http: HttpClient,
    private _userService: UserManagementService,
    private router: Router
  ) {}
  // here addcart and decreaseCart have same code, so modify this later and make it one

  // this is increasing the cart quanity with double of it current quantity / fix it 
  // addCart(productId: string): Observable<any> {
  //   return this._userService.isLoggedIn.pipe(
  //     switchMap(isLoggedIn => {
  //       if (isLoggedIn) {
  //         return this._http.patch(`${this.apiUrl}/add-cart`, {
  //           productId: productId,
  //           quantity: 1,
  //         });
  //       } else {
  //         // User is not logged in, redirect to login page
  //         this.router.navigate(['/login']);
  //         return of(null);
  //       }
  //     })
  //   );
  // }



  addCart(productId: string): Observable<any> {
    return this._http.patch(`${this.apiUrl}/add-cart`, {
      productId: productId,
      quantity: 1,
    });
  }

  decreaseCart(productId: string): Observable<any> {
    return this._http.patch(`${this.apiUrl}/decrese-cart`, {
      productId: productId,
      quantity: 1,
    });
  }

  getCart(): Observable<any> {
    return this._http.get(`${this.apiUrl}/cart`);
  }

  removeCartItem(productId: string): Observable<any> {
    const params = new HttpParams().set('productId', productId);
    return this._http.delete(`${this.apiUrl}/cart`, {
      params,
    });
  }

  clearCart(dbOrderId: string): Observable<any> {
    const params = new HttpParams().set('dbOrderId', dbOrderId);
    return this._http.delete(`${this.apiUrl}/clear-cart`, {
      params,
    });
  }
}
