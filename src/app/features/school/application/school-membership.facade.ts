import { Injectable, inject } from '@angular/core';
import { SchoolMembershipService } from './school-membership.service';
import type { ReplaceAdministratorCommand, ReplaceAdministratorResult } from '../domain/models/school-membership.model';

@Injectable({ providedIn: 'root' })
export class SchoolMembershipFacade {
  private readonly service = inject(SchoolMembershipService);

  async replaceAdministrator(schoolId: string, command: ReplaceAdministratorCommand): Promise<ReplaceAdministratorResult> {
    try {
      return await this.service.replaceAdministrator(schoolId, command);
    } catch (error) {
      console.error('Erreur lors du remplacement de l\'administrateur:', error);
      throw error;
    }
  }
}
