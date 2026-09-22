export enum SchoolStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  SUSPENDED = 'SUSPENDED',
  BLOCKED = 'BLOCKED',
}

/** École listée par GET /schools/managed (le backend renvoie toutes les informations). */
export interface SchoolSummary {
  id: string;
  name: string;
  address: string | null;
  city: string | null;
  postalCode: string | null;
  country: string | null;
  phoneNumber: string | null;
  email: string | null;
  website: string | null;
  status: SchoolStatus;
  adminUserId: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface School {
  id: string;
  name: string;
  address: string | null;
  city: string | null;
  postalCode: string | null;
  country: string | null;
  phoneNumber: string | null;
  email: string | null;
  website: string | null;
  status: SchoolStatus;
  adminUserId: string | null;
  createdAt: Date;
  updatedAt: Date;
  createdBy?: string | null;
}

export interface CreateSchoolCommand {
  name: string;
  address?: string;
  city?: string;
  postalCode?: string;
  country?: string;
  phoneNumber?: string;
  email?: string;
  website?: string;
  adminUserId?: string;
}
