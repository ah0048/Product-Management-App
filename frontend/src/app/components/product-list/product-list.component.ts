// frontend/src/app/components/product-list/product-list.component.ts
import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { CommonModule } from '@angular/common';
import { PriceFormatPipe } from '../../pipes/price-format.pipe';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-list',
  standalone: true,
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
  imports: [CommonModule, PriceFormatPipe],
})
export class ProductListComponent implements OnInit {
  products: any[] = [];

  constructor(
    private productService: ProductService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.productService.fetchProducts().subscribe({
      next: (response) => {
        if (response.status === 'success') {
          this.products = response.data.products;
        }
      },
      error: (err) => {
        console.error('Error fetching products:', err);
      },
    });
  }

  onDelete(productId: string): void {
    if (!this.authService.isLoggedIn()) {
      const confirmLogin = window.confirm('You need to be logged in to delete a product. Do you want to log in?');
      if (confirmLogin) {
        this.router.navigate(['/login']);
      }
      return;
    }

    const confirmDelete = window.confirm('Are you sure you want to delete this product?');
    if (confirmDelete) {
      this.productService.deleteProduct(productId).subscribe({
        next: (response) => {
          if (response.status === 'success') {
            this.products = this.products.filter(product => product._id !== productId);
            alert('Product deleted successfully!');
          }
        },
        error: (err) => {
          console.error('Error deleting product:', err);
        },
      });
    }
  }
}
