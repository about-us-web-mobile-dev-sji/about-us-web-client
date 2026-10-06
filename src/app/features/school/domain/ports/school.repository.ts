import { InjectionToken } from '@angular/core';
import type { CreateSchoolCommand, School } from '../models/school.model';

export interface SchoolRepository {
  list(): Promise<School[]>;
  create(command: CreateSchoolCommand): Promise<School>;
  toggleBlock(id: string): Promise<School>;
}

export const SCHOOL_REPOSITORY = new InjectionToken<SchoolRepository>('SCHOOL_REPOSITORY');
