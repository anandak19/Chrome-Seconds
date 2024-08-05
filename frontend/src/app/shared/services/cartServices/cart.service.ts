import {
  HttpClient,
  HttpHeaders,
  HttpParams,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
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
    const authData = this._userService.getAuthData();
    const token = authData.token;
    if (!token) {
      return throwError('User not logged in');
    }
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });
    return this._http
      .patch(
        `${this.apiUrl}/add-cart`,
        { productId: productId, quantity: 1 },
        { headers }
      )
      .pipe(catchError(this._userService.handleError));
  }

  decreaseCart(productId: string): Observable<any> {
    const authData = this._userService.getAuthData();
    const token = authData.token;
    if (!token) {
      return throwError('User not logged in');
    }
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });
    return this._http
      .patch(
        `${this.apiUrl}/decrese-cart`,
        { productId: productId, quantity: 1 },
        { headers }
      )
      .pipe(catchError(this._userService.handleError));
  }

  getCart(): Observable<any> {
    const authData = this._userService.getAuthData();
    const token = authData.token;
    // console.log(token);

    if (!token) {
      return throwError('User not logged in');
    }
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });
    return this._http
      .get(`${this.apiUrl}/cart`, { headers })
      .pipe(catchError(this._userService.handleError));
  }

  removeCartItem(productId: string): Observable<any> {
    const authData = this._userService.getAuthData();
    const token = authData.token;
    if (!token) {
      return throwError('User not logged in');
    }
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });
    const params = new HttpParams().set('productId', productId);
    return this._http
      .delete(`${this.apiUrl}/cart`, {
        headers, params
      })
      .pipe(catchError(this._userService.handleError));
  }

  clearCart(dbOrderId: string): Observable<any> {
    const authData = this._userService.getAuthData();
    const token = authData.token;
    if (!token) {
      return throwError('User not logged in');
    }
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });

    console.log(dbOrderId);
    
    const params = new HttpParams().set('dbOrderId', dbOrderId);
    console.log(params);

    return this._http
      .delete(`${this.apiUrl}/clear-cart`, {
        headers, params
      })
      .pipe(catchError(this._userService.handleError));
  }
}
