import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';

/**
 * This guard check if the user is logged in or not.
 * If the user is not logged, it is redirected to the login page.
 */
@Injectable()
export class AuthGuardService implements CanActivate {

    constructor(private authService: AuthService,
                private router: Router) {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
        if (state.url.startsWith('/login')) {
            return this.canActivateLogin();
        } else {
            return this.canActivateAuthorizedUrl();
        }
    }

    private canActivateLogin(): Observable<boolean> {
        return this.authService.isAuthenticated().map(isAuthenticated => {
            if (isAuthenticated) {
                this.router.navigate(['/home']);
            }
            return !isAuthenticated;
        });
    }

    private canActivateAuthorizedUrl(): Observable<boolean> {
        return this.authService.isAuthenticated().map(isAuthenticated => {
            if (!isAuthenticated) {
                this.router.navigate(['/login']);
            }
            return isAuthenticated;
        });
    }
}
