import { InjectionToken } from '@angular/core';
import type { EnsureSchoolRootCommand, EnsureSchoolRootResult, Space } from '../models/space.model';

export interface SpaceRepository {
  getSchoolTree(schoolId: string): Promise<Space[]>;
  ensureSchoolRoot(command: EnsureSchoolRootCommand): Promise<EnsureSchoolRootResult>;
}

export const SPACE_REPOSITORY = new InjectionToken<SpaceRepository>('SPACE_REPOSITORY');
