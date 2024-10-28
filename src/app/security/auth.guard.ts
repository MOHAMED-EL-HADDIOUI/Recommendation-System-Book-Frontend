import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import {AuthService} from "../service/AuthService";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    // Check if window and localStorage are available
    if (typeof window !== 'undefined' && localStorage.getItem('token')) {
      const  role = localStorage.getItem('role');
      const  username = localStorage.getItem('username');
      if(role && username)
      {
        this.authService.setUsername(username);
        this.authService.setRole(role);
      }
      return true;
    }

    // Redirect to login or some other page if not authenticated
    this.router.navigate(['/connexion']);
    return false;
  }
}
