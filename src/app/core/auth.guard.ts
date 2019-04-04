import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) { }

  async canActivate(next: ActivatedRouteSnapshot,
                    state: RouterStateSnapshot): Promise<boolean> {
      const user = await this.authService.getUser();
      const loggedIn = !!user;
      if (!loggedIn) {
        console.log('Not LoggedIn: Redirecting to Login page');
        this.router.navigate(['login'], {
            queryParams: { returnUrl: state.url }
          });
      }
      return loggedIn;
    }
}
