import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { AuthService } from '../auth/auth.service';

export const checkedLogGuard: CanActivateFn = async (route, state) => {
  const authService = inject(AuthService);
  const {data, error} = await authService.supabase.auth.getUser()
  return data.user ? true : false;
};
