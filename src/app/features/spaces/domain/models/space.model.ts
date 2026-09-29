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

export interface EnsureSchoolRootResult {
  id: string;
  schoolId: string;
  name: string;
  path: string;
  depth: number;
  kind: string;
  isNew: boolean;
}
