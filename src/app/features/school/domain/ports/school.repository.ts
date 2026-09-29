import { InjectionToken } from '@angular/core';
import type { CreateSchoolCommand, School, SchoolSummary } from '../models/school.model';

export interface SchoolRepository {
  list(): Promise<SchoolSummary[]>;
  create(command: CreateSchoolCommand): Promise<School>;
  update(id: string, command: Partial<CreateSchoolCommand>): Promise<School>;
  toggleBlock(id: string): Promise<School>;
}

export const SCHOOL_REPOSITORY = new InjectionToken<SchoolRepository>('SCHOOL_REPOSITORY');
