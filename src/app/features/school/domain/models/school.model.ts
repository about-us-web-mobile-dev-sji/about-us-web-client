export enum SchoolStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  SUSPENDED = 'SUSPENDED',
  BLOCKED = 'BLOCKED',
}

/** Élément / détail école tel que renvoyé par l'API. */
export interface SchoolListItem {
  id: string;
  name: string;
}

/**
 * Détail école tel que renvoyé par POST /schools et PATCH .../toggle-block.
 * Pas d'adresse/ville/adminUserId côté API actuelle.
 */
export interface School {
  id: string;
  name: string;
  phoneNumber: string | null;
  email: string | null;
  website: string | null;
  status: SchoolStatus | null;
  createdAt: Date;
  updatedAt: Date;
  createdBy: string | null;
}

/** Ligne de liste enrichie (merge liste + cache détail create/toggle). */
export interface SchoolSummary extends SchoolListItem {
  phoneNumber: string | null;
  email: string | null;
  website: string | null;
  status: SchoolStatus | null;
  createdAt: string | null;
  updatedAt: string | null;
  createdBy: string | null;
}

/** Corps accepté par POST /schools (CreateSchoolDto). */
export interface CreateSchoolCommand {
  name: string;
  address?: string;
  phoneNumber?: string;
  email?: string;
  website?: string;
}
