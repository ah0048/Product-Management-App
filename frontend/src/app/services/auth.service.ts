// src/app/services/auth.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:5000/api/auth';
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(this.hasToken());

  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  // Observable to track authentication state
  isAuthenticated$(): Observable<boolean> {
    return this.isAuthenticatedSubject.asObservable();
  }

  // Check if token exists
  private hasToken(): boolean {
    return !!localStorage.getItem('token');
  }

  // Login method
  login(email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, { email, password })
      .pipe(
        tap((response: any) => {
          localStorage.setItem('token', response.data.token);
          this.isAuthenticatedSubject.next(true);
        })
      );
  }

  // Register method
  register(email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, { email, password })
    .pipe(
      tap((response: any) => {
        localStorage.setItem('token', response.data.token);
        this.isAuthenticatedSubject.next(true);
      })
    );
  }

  // Logout method
  logout(): void {
    if (confirm('Are you sure you want to sign out?')) {
      localStorage.removeItem('token');
      this.isAuthenticatedSubject.next(false);
      this.router.navigate(['/login']);
    }
  }
}