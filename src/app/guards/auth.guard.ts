import {CanActivateFn, Router} from "@angular/router";
import {inject} from "@angular/core";
import { AuthService } from "../services/auth/auth.service";
/*

Guard de rutas protegidas

*/

export const authGuard: CanActivateFn = (route, state):boolean => {
  const authService = inject(AuthService);
  const authenticated = authService.isAuthenticated();

  if (authenticated) {
      return true;
  } else {
      const router = inject(Router);
      router.navigate(['/login']); // Redireccionar a login
      return false;
  }
}
