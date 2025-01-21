import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private backendUri = `${environment.backendUrl}/auth`;
  private loggedInSubject = new BehaviorSubject<boolean>(this.isLoggedIn());

  loggedIn$ = this.loggedInSubject.asObservable();

  constructor(private http: HttpClient) {}

  register(userData: { email: string; password: string; confirmPassword: string }): Observable<any> {
    return this.http.post(`${this.backendUri}/register`, userData);
  }

  login(credentials: { email: string; password: string }): Observable<any> {
    return this.http.post(`${this.backendUri}/login`, credentials);
  }

  storeToken(token: string): void {
    localStorage.setItem('auth_token', token);
    this.loggedInSubject.next(true); // Notify login state change
  }

  getToken(): string | null {
    return localStorage.getItem('auth_token');
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  logout(): void {
    localStorage.removeItem('auth_token');
    this.loggedInSubject.next(false); // Notify logout state change
  }
}
