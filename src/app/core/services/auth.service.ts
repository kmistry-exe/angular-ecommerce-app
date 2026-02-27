import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  private readonly STORAGE_KEY = 'admin_logged_in';

  constructor(private router: Router) {}

  login(email: string, password: string): boolean {
    const validEmail = 'admin@angular.com';
    const validPassword = 'admin@Angular123';

    if (email === validEmail && password === validPassword) {
      localStorage.setItem(this.STORAGE_KEY, 'true');
      return true;
    }

    return false;
  }

  logout(): void {
    localStorage.removeItem(this.STORAGE_KEY);
    this.router.navigate(['/login']);
  }

  isAuthenticated(): boolean {
    return localStorage.getItem(this.STORAGE_KEY) === 'true';
  }
}