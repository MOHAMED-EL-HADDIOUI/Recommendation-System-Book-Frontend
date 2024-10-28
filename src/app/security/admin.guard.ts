import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import {AuthService} from "../service/AuthService";

@Injectable({
    providedIn: 'root',
})
export class AdminGuard implements CanActivate {
    constructor(private authService: AuthService, private router: Router) {}

    canActivate(): boolean {
        const role = this.authService.getRole();
        console.log(role)
        // Check if user has an Admin role
        if (role === 'ADMIN') {
            return true;
        }
        // Redirect to home or another page if the user is not an admin
        this.router.navigate(['/']);
        return false;
    }
}
