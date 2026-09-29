import { Injectable, inject } from '@angular/core';
import { SPACE_REPOSITORY } from '../domain/ports/space.repository';
import type { EnsureSchoolRootCommand, EnsureSchoolRootResult, Space } from '../domain/models/space.model';

@Injectable({ providedIn: 'root' })
export class SpaceService {
  private readonly repository = inject(SPACE_REPOSITORY);

  getSchoolTree(schoolId: string): Promise<Space[]> {
    return this.repository.getSchoolTree(schoolId);
  }

  ensureSchoolRoot(command: EnsureSchoolRootCommand): Promise<EnsureSchoolRootResult> {
    return this.repository.ensureSchoolRoot(command);
  }
}
