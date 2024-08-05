import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserManagementService } from '../userServices/user-management.service';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private apiUrl = 'users';

  constructor(
    private _http: HttpClient,
    private _userService: UserManagementService
  ) {}
  // here addcart and decreaseCart have same code, so modify this later and make it one

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
