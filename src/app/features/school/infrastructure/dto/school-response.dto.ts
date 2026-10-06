import type { SchoolStatus } from '../../domain/models/school.model';

/** Réponse de GET /schools, POST /schools et PATCH /schools/:id/toggle-block. */
export interface SchoolDetailDto {
  id: string;
  name: string;
  phoneNumber: string | null;
  email: string | null;
  website: string | null;
  status: SchoolStatus;
  createdAt: string;
  updatedAt: string;
  createdBy: string;
}

/** @deprecated Alias — la liste renvoie désormais le détail complet. */
export type SchoolListItemDto = SchoolDetailDto;

/** Corps de POST /schools. */
export interface CreateSchoolRequestDto {
  name: string;
  address?: string;
  phoneNumber?: string;
  email?: string;
  website?: string;
}
