import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { orderData } from '../../../core/models/watch-details';
import { UserManagementService } from '../userServices/user-management.service';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private apiUrl = 'http://localhost:3002/api/order';

  constructor(
    private _http: HttpClient,
    private _userService: UserManagementService
  ) {}

  createRzPayOrder(amount: number, order: orderData[]): Observable<any> {
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
      .post(`${this.apiUrl}/create-order`, { amount, order }, { headers })
      .pipe(catchError(this._userService.handleError));
  }
}
