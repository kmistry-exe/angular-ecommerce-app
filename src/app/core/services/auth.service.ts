import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { LoadingService } from './loading.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly TOKEN_KEY = 'admin_token';
  private readonly STORAGE_KEY = 'admin_logged_in';

  constructor(private router: Router, private loadingService: LoadingService) {}

  login(email: string, password: string): boolean {
    const validEmail = environment.adminAuth.email;
    const validPassword = environment.adminAuth.password;

    if (email === validEmail && password === validPassword) {
      localStorage.setItem(this.STORAGE_KEY, 'true');
      localStorage.setItem(this.TOKEN_KEY, 'mock-admin-token');
      return true;
    }

    return false;
  }

  logout(): void {
    this.loadingService.show();
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
