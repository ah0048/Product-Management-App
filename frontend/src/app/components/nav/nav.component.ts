// src/app/components/nav/nav.component.ts

import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent implements OnInit {
  isAuthenticated$ = this.authService.isAuthenticated$();

  constructor(private authService: AuthService) {}

  ngOnInit(): void {}

  onLogout(): void {
    this.authService.logout();
  }
}