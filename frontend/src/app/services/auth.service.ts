import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment'; // Import environment

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private backendUri = `${environment.backendUrl}/auth`; // Use the environment variable

  constructor(private http: HttpClient) {}

  register(userData: { email: string, password: string, confirmPassword: string }): Observable<any> {
    return this.http.post(`${this.backendUri}/register`, userData);
  }

  storeToken(token: string): void {
    localStorage.setItem('auth_token', token);
  }

  getToken(): string | null {
    return localStorage.getItem('auth_token');
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  logout(): void {
    localStorage.removeItem('auth_token');
  }
}
