import {Inject, Injectable, PLATFORM_ID} from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import {AuthService} from "../service/AuthService";
import {isPlatformBrowser} from "@angular/common";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router,@Inject(PLATFORM_ID) private platformId: Object) {}

  canActivate(): boolean {
    if (isPlatformBrowser(this.platformId)) {
      if (typeof window !== 'undefined') {
        if(localStorage.getItem('token'))
        {
          const  role = localStorage.getItem('role');
          const  username = localStorage.getItem('username');
          if(role && username)
          {
            this.authService.setUsername(username);
            this.authService.setRole(role);
          }
          return true;
        }
      }
    }
    else {
      console.warn('localStorage is not available in this environment.');
    }

    // Redirect to login or some other page if not authenticated
    this.router.navigate(['/connexion']);
    return false;
  }
}
