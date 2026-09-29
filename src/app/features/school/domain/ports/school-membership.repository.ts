import { InjectionToken } from '@angular/core';
import type {
  ReplaceAdministratorCommand,
  ReplaceAdministratorResult,
} from '../models/school-membership.model';

export const SCHOOL_MEMBERSHIP_REPOSITORY = new InjectionToken<SchoolMembershipRepository>(
  'SCHOOL_MEMBERSHIP_REPOSITORY',
);

export interface SchoolMembershipRepository {
  replaceAdministrator(
    schoolId: string,
    command: ReplaceAdministratorCommand,
  ): Promise<ReplaceAdministratorResult>;
}
