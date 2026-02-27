import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  private readonly TOKEN_KEY = 'admin_token';
  private readonly STORAGE_KEY = 'admin_logged_in';

  constructor(private router: Router) { }

  login(email: string, password: string): boolean {
    const validEmail = 'admin@angular.com';
    const validPassword = 'admin@Angular123';

    if (email === validEmail && password === validPassword) {
      localStorage.setItem(this.STORAGE_KEY, 'true');
      localStorage.setItem(this.TOKEN_KEY, 'mock-admin-token');
      return true;
    }

    return false;
  }

  logout(): void {
    localStorage.removeItem(this.STORAGE_KEY);
    localStorage.removeItem(this.TOKEN_KEY);
    this.router.navigate(['/login']);
  }

  isAuthenticated(): boolean {
    return localStorage.getItem(this.STORAGE_KEY) === 'true';
  }

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }
}