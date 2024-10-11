import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    // Check if window and localStorage are available
    if (typeof window !== 'undefined' && localStorage.getItem('token')) {
      return true;
    }

    // Redirect to login or some other page if not authenticated
    this.router.navigate(['/connexion']);
    return false;
  }
}
