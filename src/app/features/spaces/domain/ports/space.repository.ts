import { InjectionToken } from '@angular/core';
import type {
  ArchiveSpaceCommand,
  AssignManagerCommand,
  CreateSpaceCommand,
  DeleteSpaceCommand,
  EnsureSchoolRootCommand,
  EnsureSchoolRootResult,
  MoveSpaceCommand,
  RestoreSpaceCommand,
  Space,
  SpaceEffectiveManagers,
  SpaceMembership,
  SpaceMembersPage,
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
  moveSpace(command: MoveSpaceCommand): Promise<void>;
  /** Membres actifs d'un espace, paginés. */
  listMembers(spaceId: string, page: number, limit: number): Promise<SpaceMembersPage>;
  addMember(spaceId: string, userId: string): Promise<SpaceMembership>;
  removeMember(spaceId: string, userId: string): Promise<SpaceMembership>;
}

export const SPACE_REPOSITORY = new InjectionToken<SpaceRepository>('SPACE_REPOSITORY');
