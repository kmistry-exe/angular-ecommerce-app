import { Component, HostListener, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet, Router, NavigationEnd } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { filter } from 'rxjs';
import { InputButtonComponent } from '../../shared/components/input-button/input-button.component';
import { ConfirmationModalComponent } from '../../shared/components/confirmation-modal/confirmation-modal.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-layout',
  imports: [
    CommonModule,
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    InputButtonComponent,
    ConfirmationModalComponent,
  ],
  templateUrl: './admin-layout.component.html',
  styleUrl: './admin-layout.component.css',
})
export class AdminLayoutComponent implements OnInit {
  showLogoutConfirm = false;
  showLoginConfirm = false;
  isMobile = false;
  isMobileMenuOpen = false;
  userEmail: string | null = '';
  isDarkMode = false;
  isDemoMode = false;
  isDashboardOrList = false;

  constructor(private authService: AuthService, private router: Router) {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.checkRoute();
    });
  }

  ngOnInit(): void {
    this.isDemoMode = this.authService.isDemoMode();
    this.userEmail = this.authService.getUserEmail();
    this.checkScreenSize();
    this.initTheme();

    if (!this.isDemoMode) {
      this.authService.startIdleTimer();
    }
    this.checkRoute();
  }

  private checkRoute(): void {
    const dashboardOrLists = ['/admin/dashboard', '/admin/products', '/admin/orders'];
    this.isDashboardOrList = dashboardOrLists.includes(this.router.url);
  }

  @HostListener('window:mousemove')
  @HostListener('window:keydown')
  @HostListener('window:click')
  @HostListener('window:scroll')
  resetTimer(): void {
    if (!this.isDemoMode) {
      this.authService.resetIdleTimer();
    }
  }

  initTheme(): void {
    const savedTheme = localStorage.getItem('theme');
    // Default to light if no saved preference
    this.isDarkMode = savedTheme === 'dark';
    this.applyTheme();
  }

  toggleDarkMode(): void {
    this.isDarkMode = !this.isDarkMode;
    localStorage.setItem('theme', this.isDarkMode ? 'dark' : 'light');
    this.applyTheme();
  }

  private applyTheme(): void {
    if (this.isDarkMode) {
      document.documentElement.classList.add('dark');
      document.documentElement.setAttribute('data-theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      document.documentElement.setAttribute('data-theme', 'light');
    }
  }

  @HostListener('window:resize')
  onResize(): void {
    this.checkScreenSize();
  }

  private checkScreenSize(): void {
    this.isMobile = window.innerWidth < 1024;
    if (!this.isMobile) {
      this.isMobileMenuOpen = false;
    }
  }

  toggleMobileMenu(): void {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
    document.body.style.overflow = this.isMobileMenuOpen ? 'hidden' : 'auto';
  }

  closeMobileMenu(): void {
    this.isMobileMenuOpen = false;
    document.body.style.overflow = 'auto';
  }

  logout(): void {
    this.authService.logout();
  }

  openLogoutConfirm(): void {
    this.showLogoutConfirm = true;
  }

  confirmLogout(): void {
    this.showLogoutConfirm = false;
    this.closeMobileMenu();
    this.authService.logout();
  }

  cancelLogout(): void {
    this.showLogoutConfirm = false;
  }

  openLoginConfirm(): void {
    this.showLoginConfirm = true;
  }

  confirmLogin(): void {
    this.showLoginConfirm = false;
    this.authService.logout(); // This will navigate to /login
  }

  cancelLogin(): void {
    this.showLoginConfirm = false;
  }
}
