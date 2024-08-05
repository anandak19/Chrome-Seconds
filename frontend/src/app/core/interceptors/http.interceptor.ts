import { HttpInterceptorFn } from '@angular/common/http';
import { UserManagementService } from '../../shared/services/userServices/user-management.service';
import { inject } from '@angular/core';

export const httpInterceptor: HttpInterceptorFn = (req, next) => {
  const apiUrl = 'http://localhost:3002/api/';

  const _userManagement = inject(UserManagementService)

  const authData = _userManagement.getAuthData();

  console.log(req);

  let newRequest = req.clone({
    url: apiUrl+req.url,
  })
  
  console.log("new",newRequest);
  
  return next(newRequest);
};
