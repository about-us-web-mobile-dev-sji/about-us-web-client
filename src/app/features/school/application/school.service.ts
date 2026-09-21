import { Injectable, inject } from '@angular/core';
import { SCHOOL_REPOSITORY } from '../domain/ports/school.repository';
import type { CreateSchoolCommand, School, SchoolSummary } from '../domain/models/school.model';

@Injectable({ providedIn: 'root' })
export class SchoolService {
  private readonly repository = inject(SCHOOL_REPOSITORY);

  listSchools(): Promise<SchoolSummary[]> {
    return this.repository.list();
  }

  createSchool(command: CreateSchoolCommand): Promise<School> {
    return this.repository.create(command);
  }

  updateSchool(id: string, command: Partial<CreateSchoolCommand>): Promise<School> {
    return this.repository.update(id, command);
  }

  toggleBlock(id: string): Promise<School> {
    return this.repository.toggleBlock(id);
  }
}
