import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from "../Service/auth.service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(public userService: AuthService, public router: Router) { }
  canActivate() {
    if (this.userService.isLoggedIn()) {
      return true;
    }
    else {
      return this.router.navigate(['/login'])
    }
  }


}
