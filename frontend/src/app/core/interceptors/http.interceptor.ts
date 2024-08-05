import { HttpInterceptorFn } from '@angular/common/http';
import { UserManagementService } from '../../shared/services/userServices/user-management.service';
import { inject } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

export const httpInterceptor: HttpInterceptorFn = (req, next) => {
  const apiUrl = 'http://localhost:3002/api/';
  
  const _userManagement = inject(UserManagementService);
  const authData = _userManagement.getAuthData();
  const token = authData ? authData.token : null;

  console.log("Old request",req);
  console.log('auth data', authData);

  let newRequest = req.clone({
    url: apiUrl + req.url,
    setHeaders: {
      Authorization: `Bearer ${token}`
    }
  });

  console.log("new",newRequest);

  return next(newRequest).pipe(
    catchError((error) => {
      // Log the error or show a notification
      console.error('HTTP Error:', error);
      // Optionally, you can add more specific error handling here

      // Return an observable with a user-facing error message
      return throwError(() => new Error('Something went wrong with the request. Please try again later.'));
    })
  );
};
