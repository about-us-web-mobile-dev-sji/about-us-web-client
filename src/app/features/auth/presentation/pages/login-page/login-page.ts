import { Component, inject } from '@angular/core';
import { LoginForm } from '../../components/login-form/login-form';
import { AuthFacade } from '../../../application/auth.facade';
import { Router } from '@angular/router';

@Component({
  imports: [LoginForm],
  selector: 'app-login-page',
  styleUrl: './login-page.css',
  templateUrl: './login-page.html',
})
export class LoginPage {
  private readonly auth = inject(AuthFacade);
  private readonly router = inject(Router);

  async handleSubmit(event: { email: string; password: string }) {
    try {
      await this.auth.login(event);
      await this.router.navigate(['/']);
    } catch (err) {
      console.error('Login failed', err);
    }
  }
}
