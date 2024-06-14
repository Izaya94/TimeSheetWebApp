import { inject } from '@angular/core';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

export const authGuard = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const currentUser = authService.currentUserValue;

  if (currentUser) {
    const roles = route.data['roles'] as Array<string>;
    if (roles && roles.length > 0) {
      const hasRequiredRole = roles.some(role => currentUser.roles.includes(role));
      if (!hasRequiredRole) {
        // Role not authorized, redirect to unauthorized page or handle appropriately
        router.navigate(['/home']);
        return false;
      }
    }

    // Authorized so return true
    return true;
  }

  // Not logged in so redirect to login page with the return url
  router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
  return false;
};
