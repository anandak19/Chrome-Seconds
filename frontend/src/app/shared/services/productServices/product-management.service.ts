import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
  HttpParams,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import {
  ProductParams,
  WatchDetails,
  databaseWatchDetails,
} from '../../../core/models/watch-details';
import { UserManagementService } from '../userServices/user-management.service';

@Injectable({
  providedIn: 'root',
})
export class ProductManagementService {
  private apiUrl = 'http://localhost:3002/api/products';

  constructor(
    private _http: HttpClient,
    private _userManagement: UserManagementService
  ) {}

  // create products
  createProduct(productData: WatchDetails) {
    const authData = this._userManagement.getAuthData();
    const token = authData.token;
    if (!token) {
      return throwError('User not logged in');
    }
    return this._http
      .post(`${this.apiUrl}`, productData, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .pipe(catchError(this.handleError));
  }

  // get all products
  getAllProducts(
    paramsObj?: ProductParams
  ): Observable<databaseWatchDetails[]> {
    let params = new HttpParams();

    if (paramsObj?.gender) {
      params = params.set('gender', paramsObj.gender);
    }

    if (paramsObj?.brand) {
      params = params.set('brand', paramsObj.brand);
    }

    if (paramsObj?.category) {
      params = params.set('category', paramsObj.category);
    }

    return this._http.get<databaseWatchDetails[]>(this.apiUrl, { params });
  }

  // get eight products
  getSomeProducts(): Observable<databaseWatchDetails[]> {
    return this._http.get<databaseWatchDetails[]>(
      `${this.apiUrl}/product/eight`
    );
  }

  // get product by id
  getProductById(productId: string): Observable<databaseWatchDetails> {
    return this._http.get<databaseWatchDetails>(`${this.apiUrl}/${productId}`);
  }

  // update Availability
  updateAvailability(
    productId: string,
    isAvailable: boolean
  ): Observable<databaseWatchDetails> {
    // const authData = this._userManagement.getAuthData();
    // const token = authData.token;
    // if (!token) {
    //   return throwError('User not logged in');
    // }
    // const headers = new HttpHeaders({
    //   'Content-Type': 'application/json',
    //   Authorization: `Bearer ${token}`,
    // });
    return this._http.patch<databaseWatchDetails>(
      `${this.apiUrl}/availability`,
      { isAvailable: isAvailable, productId: productId }
    );
  }

  // delete a product
  deleteOneProduct(productId: string): Observable<databaseWatchDetails> {
    const authData = this._userManagement.getAuthData();
    const token = authData.token;
    if (!token) {
      return throwError('User not logged in');
    }
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });

    return this._http
      .delete<databaseWatchDetails>(`${this.apiUrl}/${productId}`, { headers })
      .pipe(catchError(this.handleError));
  }

  // handle error
  private handleError(error: HttpErrorResponse) {
    let errorMessage;
    if (error.error) {
      errorMessage = error.error.error;
    }
    return throwError(errorMessage);
  }
}
