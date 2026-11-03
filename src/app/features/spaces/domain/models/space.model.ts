import type { UserSummary } from '../../../../shared/users/user-summary';

export enum SpaceKind {
  SCHOOL_ROOT = 'SCHOOL_ROOT',
  STANDARD = 'STANDARD',
}

export enum SpaceStatus {
  ACTIVE = 'ACTIVE',
  ARCHIVED = 'ARCHIVED',
}

export interface MemberDesignation {
  key: string;
  singular: string;
  plural: string;
}

export interface Space {
  id: string;
  schoolId: string;
  parentId: string | null;
  path: string;
  depth: number;
  kind: SpaceKind;
  name: string;
  description: string | null;
  memberDesignation: MemberDesignation | null;
  status: SpaceStatus;
  version: number;
  createdAt: string;
  updatedAt: string;
  archivedAt: string | null;
  deletedAt: string | null;
}

export interface EnsureSchoolRootCommand {
  schoolId: string;
  name: string;
}

export interface CreateSpaceCommand {
  parentId: string;
  name: string;
  description?: string | null;
}

export interface AssignManagerCommand {
  spaceId: string;
  userId: string;
}

export interface ArchiveSpaceCommand {
  spaceId: string;
}

export interface RestoreSpaceCommand {
  spaceId: string;
}

export interface DeleteSpaceCommand {
  spaceId: string;
  recursive?: boolean;
}

export interface MoveSpaceCommand {
  spaceId: string;
  newParentId: string;
}

export interface EnsureSchoolRootResult {
  id: string;
  schoolId: string;
  name: string;
  path: string;
  depth: number;
  kind: string;
  isNew: boolean;
}

export enum SpaceMembershipRole {
  MEMBER = 'MEMBER',
  MANAGER = 'MANAGER',
}

export enum SpaceMembershipStatus {
  ACTIVE = 'ACTIVE',
  REMOVED = 'REMOVED',
}

export interface SpaceMembership {
  id: string;
  spaceId: string;
  userId: string;
  user: UserSummary;
  role: SpaceMembershipRole;
  status: SpaceMembershipStatus;
  grantedAt: Date | null;
}

export interface SpaceMembersPage {
  items: SpaceMembership[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface SpaceEffectiveManagers {
  spaceId: string;
  directManager: SpaceMembership | null;
  inheritedManagers: SpaceMembership[];
}

export interface SpaceListItem extends Space {
  schoolName: string;
  directManagerUserId: string | null;
  directManagerLabel: string | null;
  inheritedManagerUserIds: string[];
  inheritedManagerLabels: string[];
}
