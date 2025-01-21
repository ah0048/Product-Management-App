import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-form',
  standalone: true,
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css'],
  imports: [CommonModule, ReactiveFormsModule],
})
export class ProductFormComponent implements OnInit {
  productForm!: FormGroup;
  isEditMode = false;
  productId: string | null = null;

  constructor(
    private productService: ProductService,
    private router: Router,
    private fb: FormBuilder,
    private authService: AuthService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.productForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', [Validators.required, Validators.minLength(10)]],
      price: ['', [Validators.required, Validators.min(0.01)]],
      image: [null],
    });

    // Check if in edit mode
    this.route.paramMap.subscribe((params) => {
      this.productId = params.get('id');
      if (this.productId) {
        this.isEditMode = true;
        this.loadProductDetails(this.productId);
      }
    });
  }

  onFileChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.productForm.patchValue({ image: file });
    }
  }

  loadProductDetails(productId: string): void {
    this.productService.getProductById(productId).subscribe({
      next: (response) => {
        if (response.status === 'success') {
          const product = response.data.product;
          this.productForm.patchValue({
            name: product.name,
            description: product.description,
            price: product.price,
          });
        }
      },
      error: (err) => {
        console.error('Error loading product details:', err);
      },
    });
  }

  onSubmit(): void {
    if (this.productForm.invalid) {
      return;
    }

    const formData = new FormData();
    formData.append('name', this.productForm.get('name')?.value);
    formData.append('description', this.productForm.get('description')?.value);
    formData.append('price', this.productForm.get('price')?.value);

    if (this.isEditMode && this.productId) {
      this.productService.updateProduct(this.productId, formData).subscribe({
        next: (response) => {
          if (response.status === 'success') {
            alert('Product updated successfully!');
            this.router.navigate(['/products']);
          }
        },
        error: (err) => {
          console.error('Error updating product:', err);
        },
      });
    } else {
      this.productService.addProduct(formData).subscribe({
        next: (response) => {
          if (response.status === 'success') {
            alert('Product added successfully!');
            this.router.navigate(['/products']);
          }
        },
        error: (err) => {
          console.error('Error adding product:', err);
        },
      });
    }
  }
}
