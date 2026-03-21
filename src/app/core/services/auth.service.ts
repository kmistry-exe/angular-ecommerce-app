import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable, map, of, catchError } from 'rxjs';
import { environment } from '../../../environments/environment';
import { LoadingService } from './loading.service';

export interface User {
  id: number;
  name: string;
  email: string;
  password?: string;
  role: string;
  createdAt: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly TOKEN_KEY = 'admin_token';
  private readonly STORAGE_KEY = 'admin_logged_in';
  private readonly USER_EMAIL_KEY = 'admin_user_email';
  private readonly IDLE_TIMEOUT = 30 * 60 * 1000; // 30 minutes
  private idleTimer: any;
  private apiUrl = `${environment.apiUrl}/users`;

  constructor(
    private router: Router,
    private loadingService: LoadingService,
    private http: HttpClient,
    private ngZone: NgZone,
  ) {}

  login(email: string, password: string): Observable<boolean> {
    return this.http
      .get<User[]>(`${this.apiUrl}?email=${email}&password=${password}`)
      .pipe(
        map((users) => {
          if (users.length > 0) {
            const user = users[0];
            localStorage.setItem(this.STORAGE_KEY, 'true');
            localStorage.setItem(this.TOKEN_KEY, 'mock-admin-token');
            localStorage.setItem(this.USER_EMAIL_KEY, user.email);
            this.startIdleTimer();
            return true;
          }
          return false;
        }),
        catchError(() => of(false)),
      );
  }

  logout(): void {
    this.clearIdleTimer();
    localStorage.removeItem(this.STORAGE_KEY);
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.USER_EMAIL_KEY);
    this.router.navigate(['/login']);
  }

  isAuthenticated(): boolean {
    return localStorage.getItem(this.STORAGE_KEY) === 'true';
  }

  isDemoMode(): boolean {
    return !this.isAuthenticated();
  }

  getUserEmail(): string | null {
    if (this.isDemoMode()) {
      return 'Guest (Demo Mode)';
    }
    return localStorage.getItem(this.USER_EMAIL_KEY);
  }

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  startIdleTimer(): void {
    if (!this.isAuthenticated()) return;

    this.clearIdleTimer();

    this.ngZone.runOutsideAngular(() => {
      this.idleTimer = setTimeout(() => {
        this.ngZone.run(() => {
          this.logout();
          alert('Session expired due to inactivity. Logging out...');
        });
      }, this.IDLE_TIMEOUT);
    });
  }

  resetIdleTimer(): void {
    if (this.isAuthenticated()) {
      this.startIdleTimer();
    }
  }

  private clearIdleTimer(): void {
    if (this.idleTimer) {
      clearTimeout(this.idleTimer);
      this.idleTimer = null;
    }
  }
}
