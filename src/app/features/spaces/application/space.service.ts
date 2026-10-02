import { Injectable, inject } from '@angular/core';
import { SPACE_REPOSITORY } from '../domain/ports/space.repository';
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
} from '../domain/models/space.model';

@Injectable({ providedIn: 'root' })
export class SpaceService {
  private readonly repository = inject(SPACE_REPOSITORY);

  getSchoolTree(schoolId: string): Promise<Space[]> {
    return this.repository.getSchoolTree(schoolId);
  }

  ensureSchoolRoot(command: EnsureSchoolRootCommand): Promise<EnsureSchoolRootResult> {
    return this.repository.ensureSchoolRoot(command);
  }

  createSpace(command: CreateSpaceCommand): Promise<Space> {
    return this.repository.createSpace(command);
  }

  getEffectiveManagers(spaceId: string): Promise<SpaceEffectiveManagers> {
    return this.repository.getEffectiveManagers(spaceId);
  }

  assignManager(command: AssignManagerCommand): Promise<SpaceMembership> {
    return this.repository.assignManager(command);
  }

  removeManager(spaceId: string): Promise<SpaceMembership> {
    return this.repository.removeManager(spaceId);
  }

  archiveSpace(command: ArchiveSpaceCommand): Promise<void> {
    return this.repository.archiveSpace(command);
  }

  restoreSpace(command: RestoreSpaceCommand): Promise<void> {
    return this.repository.restoreSpace(command);
  }

  deleteSpace(command: DeleteSpaceCommand): Promise<void> {
    return this.repository.deleteSpace(command);
  }
}
