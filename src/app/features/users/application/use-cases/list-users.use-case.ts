import { Injectable, inject } from '@angular/core';
import { ListUsersQuery, USER_REPOSITORY } from '../../domain/ports/user.repository';

@Injectable({ providedIn: 'root' })
export class ListUsersUseCase {
  private readonly repository = inject(USER_REPOSITORY);

  execute(query: ListUsersQuery) {
    return this.repository.listUsers(query);
  }
}