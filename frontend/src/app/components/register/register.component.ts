import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  standalone: true, // Add this if you're using standalone components
  imports: [CommonModule, ReactiveFormsModule], // Add ReactiveFormsModule
})
export class RegisterComponent {
  registerForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]]
    }, {
      validators: this.passwordMatchValidator
    });
  }

  // Update the validator to be static
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

  // Update the getter to use type safety
  get f() {
    return {
      email: this.registerForm.get('email'),
      password: this.registerForm.get('password'),
      confirmPassword: this.registerForm.get('confirmPassword')
    };
  }

  onSubmit() {
    if (this.registerForm.invalid) {
      return;
    }
    console.log(this.registerForm.value);
  }
}