import { InjectionToken } from '@angular/core';
import type {
  ArchiveSpaceCommand,
  AssignManagerCommand,
  CreateSpaceCommand,
  DeleteSpaceCommand,
  EnsureSchoolRootCommand,
  EnsureSchoolRootResult,
  RestoreSpaceCommand,
  Space,
  SpaceEffectiveManagers,
  SpaceMembership,
} from '../models/space.model';

export interface SpaceRepository {
  getSchoolTree(schoolId: string): Promise<Space[]>;
  ensureSchoolRoot(command: EnsureSchoolRootCommand): Promise<EnsureSchoolRootResult>;
  createSpace(command: CreateSpaceCommand): Promise<Space>;
  getEffectiveManagers(spaceId: string): Promise<SpaceEffectiveManagers>;
  assignManager(command: AssignManagerCommand): Promise<SpaceMembership>;
  removeManager(spaceId: string): Promise<SpaceMembership>;
  archiveSpace(command: ArchiveSpaceCommand): Promise<void>;
  restoreSpace(command: RestoreSpaceCommand): Promise<void>;
  deleteSpace(command: DeleteSpaceCommand): Promise<void>;
}

export const SPACE_REPOSITORY = new InjectionToken<SpaceRepository>('SPACE_REPOSITORY');
