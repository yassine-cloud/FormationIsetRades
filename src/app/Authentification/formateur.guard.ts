import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const formateurGuard: CanActivateFn = (route, state) => {
  const router = inject(Router)
  const user = JSON.parse(sessionStorage.getItem('user')!);
  if (sessionStorage.getItem('accessToken')) {
    if (user && user.role && user.role == "formateur") { return true; }
  }
  router.navigate(['/public','sign-up'])
  return false
};
