import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserDetails, UserLogin } from '../../../core/models/user-details';
import { Observable, catchError, throwError } from 'rxjs';
import { error } from 'node:console';

@Injectable({
  providedIn: 'root',
})
export class UserManagementService {
  private apiUrl = 'http://localhost:3002/api/users';

  constructor(private _http: HttpClient) {}

  // to create a new user / signup
  createUser(newUser: UserDetails): Observable<any> {
    return this._http
      .post(`${this.apiUrl}`, newUser)
      .pipe(catchError(this.handleError));
  }

  loginUser(userData: UserLogin): Observable<any> {
    return this._http
      .post(`${this.apiUrl}/login`, userData)
      .pipe(catchError(this.handleError));
  }

  // to handle the error in http requests
  private handleError(error: HttpErrorResponse) {
    let errorMessage;
    if (error.error) {
      errorMessage = error.error.error;
    }
    return throwError(errorMessage);
  }
}
