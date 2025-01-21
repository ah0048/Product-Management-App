import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { CommonModule } from '@angular/common';
import { PriceFormatPipe } from '../../pipes/price-format.pipe';

@Component({
  selector: 'app-product-list',
  standalone: true,
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
  imports: [CommonModule, PriceFormatPipe],
})
export class ProductListComponent implements OnInit {
  products: any[] = [];

  constructor(private productService: ProductService) {}

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
}
