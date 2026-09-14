import { Injectable, inject } from '@angular/core';
import { SCHOOL_MEMBERSHIP_REPOSITORY } from '../domain/ports/school-membership.repository';
import type { ReplaceAdministratorCommand, ReplaceAdministratorResult } from '../domain/models/school-membership.model';

@Injectable({ providedIn: 'root' })
export class SchoolMembershipService {
  private readonly repository = inject(SCHOOL_MEMBERSHIP_REPOSITORY);

  async replaceAdministrator(schoolId: string, command: ReplaceAdministratorCommand): Promise<ReplaceAdministratorResult> {
    return await this.repository.replaceAdministrator(schoolId, command);
  }
}
