import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UserManagementService } from '../../shared/services/userServices/user-management.service';

export const authGuard: CanActivateFn = (route, state) => {

  const _userManagement = inject(UserManagementService)
  const _router = inject(Router)

  const token = _userManagement.getToken();


  if (token) {
    return true
  } else {
    _router.navigate(['/login'])
    return false
  }

  // return true;
};
