import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
  standalone: true,
  imports: [CommonModule, RouterModule],
})
export class NavBarComponent implements OnInit, OnDestroy {
  isLoggedIn = false;
  private subscription!: Subscription;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.subscription = this.authService.loggedIn$.subscribe(
      (loggedIn) => (this.isLoggedIn = loggedIn)
    );
  }

  signOut(): void {
    if (confirm('Are you sure you want to sign out?')) {
      this.authService.logout();
    }
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
