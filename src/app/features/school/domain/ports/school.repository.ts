import { InjectionToken } from '@angular/core';
import type { School, CreateSchoolCommand } from '../models/school.model';

export const SCHOOL_REPOSITORY = new InjectionToken<SchoolRepository>('SCHOOL_REPOSITORY');

export interface SchoolRepository {
  create(command: CreateSchoolCommand): Promise<School>;
  findById(id: string): Promise<School | null>;
  findAll(): Promise<School[]>;
  update(id: string, command: Partial<CreateSchoolCommand>): Promise<School>;
  delete(id: string): Promise<void>;
}
