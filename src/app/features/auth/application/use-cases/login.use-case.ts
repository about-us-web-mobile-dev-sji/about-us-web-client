import { Injectable, inject } from '@angular/core';
import { AUTH_REPOSITORY, LoginCommand } from '../../domain/ports/auth.repository';

@Injectable({ providedIn: 'root' })
export class LoginUseCase {
  private readonly repository = inject(AUTH_REPOSITORY);

  async execute(command: LoginCommand) {
    return this.repository.login(command);
  }
}
