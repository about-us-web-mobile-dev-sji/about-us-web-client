import { InjectionToken } from '@angular/core';
import type { CreateSchoolCommand, School, UpdateSchoolCommand } from '../models/school.model';

export interface SchoolRepository {
  list(): Promise<School[]>;
  create(command: CreateSchoolCommand): Promise<School>;
  toggleBlock(id: string): Promise<School>;
  /** PATCH /schools/:id — champs absents = inchangés. */
  update(id: string, command: UpdateSchoolCommand): Promise<School>;
}

export const SCHOOL_REPOSITORY = new InjectionToken<SchoolRepository>('SCHOOL_REPOSITORY');
