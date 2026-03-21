import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { OnInit } from '@angular/core';
import { InputButtonComponent } from '../../../shared/components/input-button/input-button.component';
import { ValidationMessages } from '../../../shared/enums/enum';
import { InputTextComponent } from '../../../shared/components/input-text/input-text.component';
import { LoadingService } from '../../../core/services/loading.service';

@Component({
  selector: 'app-login',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    InputButtonComponent,
    InputTextComponent,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  loginForm;
  isSubmitting = false;
  loginError: string | null = null;
  formErrorMessages = ValidationMessages;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private loadingService: LoadingService,
  ) {
    this.loginForm = this.fb.nonNullable.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  get f() {
    return this.loginForm.controls;
  }

  onSubmit(): void {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.isSubmitting = true;
    this.loginError = null;

    const { email, password } = this.loginForm.getRawValue();

    this.authService.login(email, password).subscribe({
      next: (isLoggedIn) => {
        if (isLoggedIn) {
          this.isSubmitting = false;
          this.router.navigate(['/admin/dashboard']);
        } else {
          this.loginError = 'Invalid email or password';
          this.isSubmitting = false;
        }
      },
      error: () => {
        this.loginError = 'An error occurred during login';
        this.isSubmitting = false;
      },
    });
  }

  ngOnInit(): void {
    this.loadingService.hide();
    this.initTheme();

    if (this.authService.isAuthenticated()) {
      this.router.navigate(['/admin/dashboard']);
    }
  }

  continueAsGuest(): void {
    this.router.navigate(['/admin/dashboard']);
  }

  private initTheme(): void {
    const theme = localStorage.getItem('theme');
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
      document.documentElement.setAttribute('data-theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      document.documentElement.setAttribute('data-theme', 'light');
    }
  }
}
