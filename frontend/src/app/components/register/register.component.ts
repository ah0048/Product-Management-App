import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service'; // Import AuthService
import { Router } from '@angular/router'; // Import Router for redirection
import { HttpClientModule } from '@angular/common/http'; // Add this import

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule],
})
export class RegisterComponent {
  registerForm: FormGroup;
  errorMessage: string | null = null;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService, // Inject AuthService
    private router: Router // Inject Router
  ) {
    this.registerForm = this.fb.group(
      {
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', [Validators.required]],
      },
      {
        validators: this.passwordMatchValidator,
      }
    );
  }

  private passwordMatchValidator(group: FormGroup) {
    const password = group.get('password');
    const confirmPassword = group.get('confirmPassword');

    if (password?.value !== confirmPassword?.value) {
      confirmPassword?.setErrors({ mismatch: true });
    } else {
      confirmPassword?.setErrors(null);
    }
    return null;
  }

  get f() {
    return {
      email: this.registerForm.get('email'),
      password: this.registerForm.get('password'),
      confirmPassword: this.registerForm.get('confirmPassword'),
    };
  }

  onSubmit() {
    if (this.registerForm.invalid) {
      return;
    }

    const userData = this.registerForm.value;
    console.log(userData)
    this.authService.register(userData).subscribe(
      (response) => {
        if (response.status === 'success') {
          this.authService.storeToken(response.data.token); // Store the token
          this.router.navigate(['/products']); // Redirect to products page
        } else {
          this.errorMessage = response.data.message; // Show error message
        }
      },
      (error) => {
        this.errorMessage = error.message; // Handle error
      }
    );
  }
}
