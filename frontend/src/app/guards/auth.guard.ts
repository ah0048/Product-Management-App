import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    const token = localStorage.getItem('auth_token');
    if (token) {
      return true; // Allow access if token exists
    }

    // Redirect to login if not authenticated
    alert('You need to be logged in to access this page.');
    this.router.navigate(['/login']);
    return false;
  }
}
