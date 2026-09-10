import { Injectable, signal, inject } from '@angular/core';
import { LoginUseCase } from './use-cases/login.use-case';
import { AuthenticatedUser } from '../domain/models/authenticated-user.model';

@Injectable({ providedIn: 'root' })
export class AuthFacade {
  private readonly loginUseCase = inject(LoginUseCase);

  readonly isLoading = signal(false);
  readonly user = signal<AuthenticatedUser | null>(null);

  async login(command: { email: string; password: string }) {
    this.isLoading.set(true);
    try {
      const user = await this.loginUseCase.execute(command);
      this.user.set(user);
      return user;
    } finally {
      this.isLoading.set(false);
    }
  }
}
