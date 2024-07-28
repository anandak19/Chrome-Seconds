import {
  HttpClient,
  HttpErrorResponse,
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
  private apiUrl = 'http://localhost:3002/api/users';

  constructor(
    private _http: HttpClient,
    private _userService: UserManagementService
  ) {}

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
        { productId: productId },
        { headers }
      )
      .pipe(catchError(this._userService.handleError));
  }
}
