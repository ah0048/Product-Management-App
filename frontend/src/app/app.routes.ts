// src/app/app.routes.ts
import { Routes } from '@angular/router';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductFormComponent } from './components/product-form/product-form.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ReactiveFormsModule } from '@angular/forms';

export const routes: Routes = [
  { path: '', redirectTo: '/products', pathMatch: 'full' }, // Redirect to products page by default
  { path: 'products', component: ProductListComponent }, // List products
  { path: 'products/add', component: ProductFormComponent }, // Add a new product
  { path: 'products/edit/:id', component: ProductFormComponent }, // Edit a product
  { path: 'login', component: LoginComponent }, // Login page
  { path: 'register', component: RegisterComponent }, // Register page
];

export const appConfig = {
  imports: [ReactiveFormsModule],
};