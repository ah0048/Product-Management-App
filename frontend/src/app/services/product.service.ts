// frontend/src/app/services/product.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private apiUrl = `${environment.backendUrl}/products`;

  constructor(private http: HttpClient, private authService: AuthService) {}

  fetchProducts(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  deleteProduct(productId: string): Observable<any> {
    const token = this.authService.getToken(); // Get the token from AuthService
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.http.delete<any>(`${this.apiUrl}/${productId}`, { headers });
  }
}
