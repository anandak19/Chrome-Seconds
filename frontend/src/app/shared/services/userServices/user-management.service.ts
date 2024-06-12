import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  UserDetails,
  UserLogin,
  passwordUpdation,
  updatedUser,
} from '../../../core/models/user-details';
import { BehaviorSubject, Observable, catchError, tap, throwError } from 'rxjs';
import { AppConfig } from '../../../../config/app-config';

@Injectable({
  providedIn: 'root',
})
export class UserManagementService {
  private apiUrl = 'http://localhost:3002/api/users';

  private currentUserImageSubject!: BehaviorSubject<string>;
  public currentUserImage!: Observable<string>;
  private loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(private _http: HttpClient) {
    const storedImage = this.getStoredImage();
    this.currentUserImageSubject = new BehaviorSubject<string>(storedImage);
    this.currentUserImage = this.currentUserImageSubject.asObservable();
  }

  // ------------http requests------------

  // to create a new user / signup
  createUser(newUser: UserDetails): Observable<any> {
    return this._http
      .post(`${this.apiUrl}`, newUser)
      .pipe(catchError(this.handleError));
  }

  // to login a user
  loginUser(userData: UserLogin): Observable<any> {
    return this._http.post(`${this.apiUrl}/login`, userData).pipe(
      tap((response: any) => {
        const { token, userImage, role } = response;
        const authData = {
          token: token,
          userImage: userImage,
          role: role,
        };

        
        const authDataString = JSON.stringify(authData);
        localStorage.setItem('authData', authDataString);
        this.currentUserImageSubject.next(userImage);
      }),
      catchError(this.handleError)
    );
  }

  // http requests to get user details
  getUserDetails(): Observable<any> {
    // const token = this.getToken();
    const authData = this.getAuthData()
    const token = authData.token
    if (!token) {
      return throwError('User not logged in');
    }
    return this._http
      .get(`${this.apiUrl}/profile`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .pipe(catchError(this.handleError));
  }

  // http reqest to store the user image string
  updateUserImage(imageString: string | null): Observable<any> {
    const authData = this.getAuthData();
    const token = authData.token;
    if (!token) {
      return throwError('User not logged in');
    }
    return this._http
      .post(
        `${this.apiUrl}/image`,
        { image: imageString },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .pipe(catchError(this.handleError));
  }

  // http reqest to update user details
  updateUserDetails(userData: updatedUser): Observable<any> {
    const authData = this.getAuthData()
    const token = authData.token;
    if (!token) {
      return throwError('User not logged in');
    }
    return this._http
      .patch(`${this.apiUrl}`, userData, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .pipe(catchError(this.handleError));
  }

  // http reqest to update user password
  updateUserPassword(passwords: passwordUpdation): Observable<any> {
    const authData = this.getAuthData();
    const token = authData.token
    if (!token) {
      return throwError('User not logged in');
    }
    return this._http
      .patch(`${this.apiUrl}/password`, passwords, {
        headers: { Authorization: `Bearer ${token}` },
      })
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
  // ------------other functions------------

  // get auth data from localStorage 
  getAuthData() {
    const authDataString = localStorage.getItem('authData');

    if (authDataString) {
      try {
        const authData = JSON.parse(authDataString);
        return authData;
      } catch (error) {
        console.error('Error parsing authData from localStorage', error);
        return null;
      }
    }
    return null;
  }

  // to get user image
  private getStoredImage(): string {
    if (typeof window !== 'undefined') {
      const authData = this.getAuthData();
      if (authData && authData.userImage) {
        return authData.userImage;
      }
    }
    return AppConfig.defaultUserUrl;
  }

  // to check if user is login 
  get isLoggedIn(): Observable<boolean> {
    const authData = this.getAuthData()
    if (authData) {
      this.loggedIn.next(true);
    } else {
      this.loggedIn.next(false);
    }

    return this.loggedIn.asObservable();
  }

  logoutUser() {
    localStorage.clear();
    
    this.currentUserImageSubject.next(AppConfig.defaultUserUrl);
  }
}
