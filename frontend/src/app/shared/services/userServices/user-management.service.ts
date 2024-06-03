import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserDetails, UserLogin } from '../../../core/models/user-details';
import { Observable, catchError, tap, throwError } from 'rxjs';
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
    return this._http.post(`${this.apiUrl}/login`, userData).pipe(
      tap((response: any) => {
        const { token, userImage } = response;
        localStorage.setItem('authToken', token);
        localStorage.setItem('userImage', userImage || null);
      }),

      catchError(this.handleError)
    );
  }

  // http requests to get user details 
  getUserDetails(): Observable<any> {
    const token = this.getToken()
    if (!token) {
      return throwError('User not logged in');
    }
    return this._http
      .get(`${this.apiUrl}/profile`, { 
        headers: { Authorization: `Bearer ${token}` },
      })
      .pipe(catchError(this.handleError));
  }


  // to return token 
  getToken() {
    return localStorage.getItem('authToken');
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
