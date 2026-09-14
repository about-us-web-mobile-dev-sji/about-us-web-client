export enum SchoolStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  PENDING = 'PENDING',
}

export interface School {
  id: string;
  name: string;
  code: string;
  address: string;
  city: string;
  postalCode: string;
  country: string;
  phone: string;
  email: string;
  status: SchoolStatus;
  principalAdminId?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateSchoolCommand {
  name: string;
  code: string;
  address: string;
  city: string;
  postalCode: string;
  country: string;
  phone: string;
  email: string;
  principalAdminId?: string;
}
