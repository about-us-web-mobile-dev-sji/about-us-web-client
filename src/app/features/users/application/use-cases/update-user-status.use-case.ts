import { Injectable, inject } from '@angular/core';
import { UpdateUserStatusCommand, USER_REPOSITORY } from '../../domain/ports/user.repository';

@Injectable({ providedIn: 'root' })
export class UpdateUserStatusUseCase {
  private readonly repository = inject(USER_REPOSITORY);

  execute(command: UpdateUserStatusCommand) {
    return this.repository.updateUserStatus(command);
  }
}