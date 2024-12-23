import {CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";
import {AuthService} from "../../services/auth.service";
import {Observable, of} from "rxjs";



export const authGuard: CanActivateFn = (): Observable<boolean> => {
  const authService = inject(AuthService);
  const router = inject(Router);
  if(authService.isAuthenticated()) {
    return of( true);
  } else {
    router.navigate(['dashboard']);
  }

  router.navigate(['/sign-in']);
  return of(false);
};
