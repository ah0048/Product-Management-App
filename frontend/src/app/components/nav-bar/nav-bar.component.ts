import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router'; // Add this import

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
  standalone: true,
  imports: [CommonModule, RouterModule], // Add RouterModule here
})
export class NavBarComponent {
  isLoggedIn = !!localStorage.getItem('token');

  signOut() {
    if (confirm('Are you sure you want to sign out?')) {
      localStorage.removeItem('token');
      this.isLoggedIn = false;
    }
  }
}
