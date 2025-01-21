import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service'; // Import AuthService
import { Router } from '@angular/router'; // Import Router for redirection
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule, RouterModule],
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMessage: string | null = null;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService, // Inject AuthService
    private router: Router // Inject Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  get f() {
    return {
      email: this.loginForm.get('email'),
      password: this.loginForm.get('password'),
    };
  }

  onSubmit() {
    if (this.loginForm.invalid) {
      return;
    }

    const loginData = this.loginForm.value;

    this.authService.login(loginData).subscribe(
      (response) => {
        if (response.status === 'success') {
          this.authService.storeToken(response.data.token); // Store the token
          this.router.navigate(['/products']); // Redirect to products page
        } else {
          this.errorMessage = response.data.message; // Show error message
        }
      },
      (error) => {
        if (error.error && error.error.data && error.error.data.message) {
          this.errorMessage = error.error.data.message; // Backend-provided error message
        } else {
          this.errorMessage = 'An unexpected error occurred. Please try again.'; // Fallback error message
        }
      }
    );
  }
}
