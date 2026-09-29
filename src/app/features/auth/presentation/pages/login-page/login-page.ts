import type { LoginCommand } from '../../../domain/ports/auth.repository';
import { Component, inject } from '@angular/core';
import { LoginForm } from '../../components/login-form/login-form';
import { AuthFacade } from '../../../application/auth.facade';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  imports: [LoginForm],
  selector: 'app-login-page',
  styleUrl: './login-page.css',
  templateUrl: './login-page.html',
})
export class LoginPage {
  readonly passwordChanged = inject(ActivatedRoute).snapshot.queryParamMap.get('passwordChanged') === '1';
  readonly auth = inject(AuthFacade);
  private readonly router = inject(Router);

  async handleSubmit(event: LoginCommand): Promise<void> {
    try {
      await this.auth.login(event);
    } catch {return;}
    const destination = this.auth.isSuperAdmin() ? '/s/schools' : '/home';
    await this.router.navigateByUrl(destination, { replaceUrl: true });
  }
}
